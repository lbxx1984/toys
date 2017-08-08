// 业务无关的工具集
define(function (require) {

    var _ = require('underscore');

    return {
        space: function (len) {
            var result = '';
            while (len > 0) {
                result += ' ';
                len--;
            }
            return result;
        },
        initial2LowerCase: function (str) {
            return str.replace(/(\w)/, function (v) {
                return v.toLowerCase();
            });
        },
        camel2hyphen: function (uuid) {
            return this.initial2LowerCase(uuid).replace(/([A-Z])/g, '-$1').toLowerCase();
        },
        json2code: function (data, space) {
            var me = this;
            var code = JSON.stringify(data, null, 4).split('\n');
            space = this.space(space);
            return code.map(function (line, index) {
                line = line.replace('    "', '    ').replace('":', ':');
                if (line.indexOf('require(') > -1) {
                    var p = line.indexOf('require(') + 9;
                    var q = line.indexOf(')', p);
                    var moduleName = line.substr(p, q - p - 1);
                    var arr = line.split(': ');
                    if (me.isCustomModule(moduleName)) {
                        arr[1] = 'require(\'./components/' + moduleName + '.jsx\')'
                            + (line.indexOf(',') > -1 ? ',' : '');
                    }
                    else {
                        arr[1] = arr[1].replace('"require', 'require').replace('\')"', '\')');
                    }
                    line = arr.join(': ');
                }
                if (line.indexOf('"') > -1) {
                    line = line.replace(/'/g, '>-<').replace(/"/g, '\'').replace(/>-</g, '\\\'');
                }
                return (index > 0 ? space : '') + line;
            }).join('\n');
        },
        hasFile: function (arr, filename, foldername) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].filename === filename && arr[i].foldername === foldername) return true;
            }
            return false;
        },
        isCustomModule: function (name) {
            if (!name) {
                return false;
            }
            var char = name.charAt(0);
            return char >= 'A' && char <= 'Z';
        },
        obj2css: function (style, backspace) {
            var result = [];
            var me = this;
            _.each(style, function (item, key) {
                if (key === 'border' && item === '1px dashed #D4D4D4') {
                    return;
                }
                if (key.indexOf('border') === 0 && item === '') {
                    return;
                }
                var addPx = [
                    'width', 'height',
                    'margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom',
                    'padding', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingTop'
                ];
                if (addPx.indexOf(key) > -1 && !isNaN(item)) {
                    item = item + 'px';
                }
                if (item === '') {
                    item = '""';
                }
                result.push(backspace + me.camel2hyphen(key) + ': ' + item + ';');
            });
            return result;
        },
        obj2less: function (object, backspace, space) {
            var result = [];
            var me = this;
            backspace = backspace || '';
            _.each(object, function (value, key) {
                if (key === 'style') {
                    result = [].concat(result, me.obj2css(value, backspace));
                    return;
                }
                var namespace = me.camel2hyphen(key);
                if (space && !isNaN(space.replace(namespace, ''))) {
                    result = [].concat(result, me.obj2css(value.style, backspace));
                    return;
                }
                result = [].concat(result,
                    [backspace + '.' + namespace + ' {'],
                    me.obj2less(value, me.space(backspace.length + 4), namespace),
                    [backspace + '}']
                );
            });
            return result;
        }
    };

});
