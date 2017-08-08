define(function (require) {


    var _ = require('underscore');
    var util = require('./util');


    function getLess(uuid, dataset, customModuleInfo) {
        var result = [];
        var customHash = {};
        var space4 = util.space(4);
        customModuleInfo.map(function (item) {
            customHash[item.uuid] = true;
        });
        if (dataset[uuid] && dataset[uuid].style) {
            result = result.concat(util.obj2css(dataset[uuid].style, space4));
        }
        _.each(dataset, function (value, key) {
            if (customHash[key] || !value.style || key === uuid) {
                return;
            }
            result = result.concat(
                [space4 + '.' + util.camel2hyphen(key) + ' {'],
                util.obj2css(value.style, space4 + space4),
                [space4 + '}']
            );
        });
        return result;
    };


    return getLess;

});
