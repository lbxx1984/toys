define(function (require) {


    var _ = require('underscore');
    var util = require('./util');


    function getCustomModuleInfo(structure, result) {
        result = result || [];
        if (util.isCustomModule(structure.module)) {
            result.push({
                uuid: structure.uuid,
                module: structure.module
            });
        }
        structure.children instanceof Array && structure.children.map(function (child) {
            getCustomModuleInfo(child, result);
        });
        return result;
    };


    return getCustomModuleInfo;

});
