define(function (require) {


    var _ = require('underscore');
    var util = require('./util');


    function getCustomModuleName(data) {
        var result = '';
        _.each(data, function (value, key) {
            value['data-is-custom-module'] && (result = key);
        });
        return result;
    }


    function deepClone(data) {

        data = JSON.parse(JSON.stringify(data));
        // 删除第一层中的dangerouslySetInnerHTML
        _.each(data, function (obj) {
            delete obj.dangerouslySetInnerHTML;
        });
        // 删除所有style字段和className字段
        deleteUselessField(data);
        // 删除第一层的空对象
        _.each(data, function (obj, key) {
            !_.keys(obj).length && (delete data[key]);
        });

        function deleteUselessField(obj) {
            ['style', 'className', 'data-uuid', 'data-is-custom-module'].map(function (field) {
                delete obj[field];
            });
            _.keys(obj).length && _.each(obj, deleteUselessField);
        }

        return data;
    }


    /**
     * 从文件结构中分析出渲染器
     *
     * @param {Object} dataset 文件属性集合
     * @param {number} backspace 缩进
     * @param {Object} userInfo 用户信息
     * @param {Array} exportResult 整个导出器的结果
     */
    function produceProps(dataset, backspace, userInfo) {

        var result = [];
        var custom = [];
        var file = [];
        var backspace = util.space(backspace);
        var newDataset = deepClone(dataset);

        _.each(dataset, function (data, key) {
            if (!newDataset[key]) return;
            var customModuleName = getCustomModuleName(data);
            var funcBody = '';
            var funcName = util.initial2LowerCase(key) + 'Props';
            if (customModuleName) {
                funcBody = 'return require(\'./componentsPropsFactory\').' + key + ';';
            }
            else {
                funcBody = 'return ' + util.json2code(newDataset[key], backspace.length + 4) + ';';
                delete newDataset[key];
            }
            result.push([
                '\n',
                backspace + 'function ' + funcName + ' (me) {',
                backspace + backspace + funcBody,
                backspace + '}'
            ].join('\n'));
        });

        if (_.keys(newDataset).length) {
            var code = util.json2code(newDataset, 4);
            custom = findDepsFromCode(code);
            file.push({
                filename: 'componentsPropsFactory.js',
                foldername: '',
                code: [
                    '/**',
                    ' * @file componentsPropsFactory.js',
                    ' * @date ' + (new Date()),
                    ' * @author ' + userInfo.email,
                    ' */',
                    'define(function (require) {',
                    '    return ' + code + ';',
                    '}'
                ].join('\n')
            });
        }

        return {
            result: result,
            custom: custom,
            file: file
        };

    }


    function findDepsFromCode(code) {
        code = code.split('\n');
        var result = [];
        code.map(function (line) {
            if (line.indexOf('require') > -1) {
                var p = line.indexOf('require(') + 9;
                var q = line.indexOf(')', p);
                var dep = line.substr(p, q - p - 1);
                if (dep.indexOf('./components/') === 0) {
                    result.push(dep.replace('./components/', '').replace('.jsx', ''));
                }
            }
        });
        return result;
    }


    return produceProps;

});
