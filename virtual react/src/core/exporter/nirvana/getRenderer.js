define(function (require) {


    var _ = require('underscore');
    var util = require('./util');
    var OPEN_MODULES = require('config').OPEN_MODULES;


    /**
     * 从文件结构中分析出渲染器
     *
     * @param {Object} param.file 文件
     * @param {number} param.backspace 缩进
     * @param {boolean} param.isSubModule 是否为子模块
     * @param {boolean} param.isInnerRender 是否为子渲染器
     */


    function produceRenderer(param) {

        var result = [];
        var isSubModule = param.isSubModule;
        var isInnerRender = param.isInnerRender;
        var isCustomModule = util.isCustomModule(param.file.structure.module);
        var backspace = util.space(param.backspace);
        var type = param.file.structure.type;
        var uuid = param.file.structure.uuid;
        var children = param.file.structure.children;
        var dataset = param.file.dataset[uuid] ? param.file.dataset[uuid] : {};
        var idClassName = util.camel2hyphen(uuid);

        // 处理props
        var props = isSubModule
            ? ' {...this.props[\'' + uuid + '\']}'
            : ' {...' + util.initial2LowerCase(uuid) + 'Props(this)}';

        // 处理className
        var className = [];
        if (dataset.className) {
            className.push(dataset.className);
        }
        if (isCustomModule) {
            // 自定义模块
            className.push(idClassName);
            className = ' className="' + className.join(' ') + '"';
        }
        else {
            if (isInnerRender) {
                // 子渲染器
                if (dataset.style && _.keys(dataset.style).length) {
                    className.push(idClassName);
                }
                className = ' className="' + className.join(' ') + '"';
            }
            else {
                // 自定义模块根容器
                className.push(idClassName);
                if (isSubModule) {
                    className = ' className={"' + className.join(' ') +' " + this.props.className}';
                }
                // 主文件跟容器
                else {
                    className = ' className="' + className.join(' ') + '"';
                }
            }
        }
        if (className === ' className=""' || (className instanceof Array)) {
            className = '';
        }

        // 处理innerHTML
        var innerHTML = '';
        if (!isSubModule && dataset.dangerouslySetInnerHTML) {
            innerHTML = dataset.dangerouslySetInnerHTML.__html ? dataset.dangerouslySetInnerHTML.__html : '';
            delete dataset.dangerouslySetInnerHTML;
        }

        // 剔除空的属性集合
        var tempDataset = JSON.parse(JSON.stringify(dataset));
        delete tempDataset.style;
        delete tempDataset.className;
        if (!_.keys(tempDataset).length) {
            props = '';
        }

        // 生成元素
        if (children instanceof Array || OPEN_MODULES.indexOf(type + ';') > -1) {
            result[0] = backspace + '<' + type + className + props + '>';
            innerHTML && result.push(backspace + '    ' + innerHTML);
            children instanceof Array && children.map(function (child) {
                var nextParam = {
                    file: {
                        structure: child,
                        dataset: param.file.dataset
                    },
                    backspace: param.backspace + 4,
                    isSubModule: param.isSubModule,
                    isInnerRender: true
                };
                result = [].concat(result, produceRenderer(nextParam));
            });
            result.push(backspace + '</' + type + '>');
        }
        else {
            result[0] = backspace + '<' + type + className + props + '/>';
        }
        return result;
    }


    return produceRenderer;

});
