define(function (require) {


    var _ = require('underscore');
    var util = require('./util');


    /**
     * 从文件结构中分析出所有依赖
     *
     * @param {Object} structure 文件结构
     * @param {Array} base 文件的基础依赖模块
     * @param {Array} custom 文件的自定义依赖模块
     * @param {boolean} isSubModule 当前文件是不是子模块 
     */
    function findDeps(structure, base, custom, isSubModule) {

        base = base || [];
        custom = custom || [];

        // 分析当前模块
        if (typeof structure.module === 'string' && typeof structure.type === 'string') {
            var filename = structure.module + (structure.module.indexOf('.jsx') > -1 ? '' : '.jsx');
            // 自定义模块
            if (util.isCustomModule(filename)) {
                var realname = filename.replace('.jsx', '');
                custom.indexOf(realname) < 0 && custom.push(realname);
                filename = './' + (isSubModule ? '' : 'components/') + filename;
            }
            var dep = JSON.stringify({
                value: util.space(4) + 'let ' + structure.type + ' = require(\'' + filename + '\');',
                name: filename
            });
            base.indexOf(dep) < 0 && base.push(dep);
        }

        // 分析子模块
        structure.children instanceof Array && structure.children.map(function (child) {
            findDeps(child, base, custom, isSubModule);
        });

        // 处理结果
        base.sort(function (a, b) {
            return JSON.parse(a).name < JSON.parse(b).name;
        });
        base = base.map(function (i) {
            return JSON.parse(i).value;
        });

        return {
            base: base,
            custom: custom
        };

    }

    return findDeps;

});
