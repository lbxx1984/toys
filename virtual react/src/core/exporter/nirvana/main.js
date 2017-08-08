define(function (require) {


    var _ = require('underscore');
    var util = require('./util');

    var getDep = require('./getDep');
    var getRenderer = require('./getRenderer');
    var getProps = require('./getProps');

    var getCustomModuleInfo = require('./getCustomModuleInfo');
    var getLess = require('./getLess');
    var getSubLess = require('./getSubLess');
    var getDiffLess = require('./getDiffLess');


    /**
     * 导出文件入口
     *
     * @param {Object} file 文件对象
     * @param {Object} modules 自定义模块的hash
     * @param {Object} userInfo 当前登录用户信息
     */
    return function (file, modules, userInfo) {
        var result = [];
        exportJSX(file, modules, userInfo, false, result);
        exportLess(file, modules, userInfo, false, result);
        return result;
    };


    function exportJSX(file, modules, userInfo, isSubModule, result) {

        var filename = file.filename + '.jsx.js';
        var foldername = isSubModule ? 'components' : '';
        if (util.hasFile(result, filename, foldername)) return;

        var custom = [];
        var structure = file.structure;
        var skin = isSubModule ? [] : [
            '        childContextTypes: {',
            '            appSkin: React.PropTypes.string',
            '        },',
            '        getChildContext() {',
            '            return {',
            '                appSkin: ' + (structure.skin ? '\'' + structure.skin + '\'' : '\'\''),
            '            };',
            '        },'
        ];
        var deps = getDep(structure, null, null, isSubModule);
        var renders = getRenderer({
            file: file,
            backspace: 16,
            isSubModule: isSubModule
        });
        var props = isSubModule ? {
            result: [],
            custom: [],
            file: []
        } : getProps(file.dataset, 4, userInfo, result);
        var code = [].concat(
            [
                '/**',
                ' * @file ' + filename,
                ' * @date ' + (new Date()),
                ' * @author ' + userInfo.email,
                ' */',
                'define(function (require) {',
                '\n',
                '    let React = require(\'react\');'
            ],
            deps.base,
            [
                '\n',
                '    return React.createClass({',
            ],
            skin,
            [
                '        render() {',
                '            return ('
            ],
            renders,
            [
                '            );',
                '        }',
                '    });',
            ],
            props.result,
            [
                '\n',
                '});'
            ]
        );

        result.push({
            filename: filename,
            foldername: foldername,
            code: code.join('\n')
        });

        // 导出自定义模块
        deps.custom.map(function (dep) {
            custom.indexOf(dep) < 0 && (custom.push(dep));
        });
        props.custom.map(function (dep) {
            custom.indexOf(dep) < 0 && (custom.push(dep));
        });
        custom.map(function (item) {
            if (!modules[item]) return;
            var newFile = {
                filename: item,
                dataset: modules[item].dataset,
                structure: modules[item].structure
            };
            exportJSX(newFile, modules, userInfo, true, result);
        });

        // 导出属性工厂
        props.file.map(function (item) {
            result.push(item);
        });
    }


    function exportLess(file, modules, userInfo, isSubModule, result) {

        var filename = file.filename + '.less';
        var foldername = isSubModule ? 'css' : '';
        if (util.hasFile(result, filename, foldername)) return;

        var structure = file.structure;
        var dataset = file.dataset;
        var customModuleInfo = getCustomModuleInfo(structure);

        // 获取所有子模块，并导出子模块样式模板
        customModuleInfo.map(function (item) {
            var newFile = JSON.parse(JSON.stringify(modules[item.module]));
            newFile.filename = util.initial2LowerCase(item.module);
            exportLess(newFile, modules, userInfo, true, result);
        });
        // 获取当前模块与子模块之间的样式差异
        var cssDiff = getDiffLess(dataset, customModuleInfo, modules);
        // 获取需要import的子less
        var subLess = isSubModule ? [] : getSubLess(result);
        // 输出当前模块
        var code = [].concat(
            [
                '/**',
                ' * @file ' + filename,
                ' * @date ' + (new Date()),
                ' * @author ' + userInfo.email,
                ' */',
            ],
            subLess,
            ['.' + util.camel2hyphen(structure.uuid) + ' {'],
            getLess(structure.uuid, dataset, customModuleInfo),
            util.obj2less(cssDiff, util.space(4)),
            ['}']
        );

        result.push({
            filename: filename,
            foldername: foldername,
            code: code.join('\n')
        });

    }

});
