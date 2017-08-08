define(function (require) {


    var babel = require('babel');
    var util = require('./exporter/nirvana/util');
    var OPEN_MODULES = require('../config').OPEN_MODULES;


    function getDeps(structure, deps) {
        var space = util.space(4);
        deps = deps || [];
        if (typeof structure.module === 'string' && typeof structure.type === 'string') {
            var dep = space + 'let ' + structure.type + ' = require(\'' + structure.module + '\');'
            if (deps.indexOf(dep) < 0) deps.push(dep);
        }
        if (!(structure.children instanceof Array)) return;
        structure.children.map(function (child) {
            getDeps(child, deps);
        });
        return deps;
    }


    function getCustomModules(deps) {
        return deps.filter(function (item) {
            return !util.isCustomModule(item);
        }).map(function (item) {
            var index = item.indexOf(' =');
            return '/* import dep: ' + item.substr(8, index - 8) + '*/';
        });
    }


    function getRenders(structure, step, deleteUuid) {
        var result = [];
        var space = util.space(step * 4);
        var isCustomModule = structure.type.charCodeAt(0) > 64 && structure.type.charCodeAt(0) < 91;
        var uuid = deleteUuid ? '' : ((isCustomModule ? ' uuid="' : ' data-uuid="') + structure.uuid + '"');
        var props = ' {...this.props[\'' + structure.uuid + '\']}';
        if (structure.children instanceof Array || OPEN_MODULES.indexOf(structure.type + ';') > -1) {
            result[0] = space + '<' + structure.type + uuid + props + '>';
            structure.children instanceof Array && structure.children.map(function (child) {
                result = [].concat(result, getRenders(child, step * 1 + 1, deleteUuid));
            });
            result.push(space + '</' + structure.type + '>');
        }
        else {
            result[0] = space + '<' + structure.type + uuid + props + ' />';
        }
        return result;
    }


    return function (structure, compileWithBabel, deleteUuid, dontUseSkin) {
        var deps = getDeps(structure);
        var skin = dontUseSkin ? [] : [
            '        childContextTypes: {',
            '            appSkin: React.PropTypes.string',
            '        },',
            '        getChildContext: function () {',
            '            return {',
            '                appSkin: ' + (structure.skin ? '\'' + structure.skin + '\'' : '\'\''),
            '            };',
            '        },'
        ];
        var result = [].concat(
            getCustomModules(deps),
            [
                'define(\'' + structure.uuid + '\', function (require) {',
                '    let React = require(\'react\');'
            ],
            deps,
            [
                '    return React.createClass({',
            ],
            skin,
            [    
                '        render: function () {',
                '            return ('
            ],
            getRenders(structure, 4, deleteUuid),
            [
                '            );',
                '        }',
                '    });',
                '});'
            ]
        ).join('\n');
        return compileWithBabel
            ? babel.transform(result).code.replace(/"use strict";|'use strict';/g, '')
            : result;
    }


});
