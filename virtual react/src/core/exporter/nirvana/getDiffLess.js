define(function (require) {


    var  _ = require('underscore');


    function deepCloneKeepStyle(data) {
        var result = JSON.parse(JSON.stringify(data));
        forObject(result);
        return result;
        function forObject(obj) {
            _.each(obj, function (value, key) {
                if (key === 'style') {
                    return;
                }
                var json = null;
                try {
                    json = JSON.stringify(value);
                }
                catch (e) {}
                if (typeof json !== 'string' || json.indexOf('"style":') < 0) {
                    delete obj[key];
                    return;
                }
                if (typeof value !== 'object') {
                    delete obj[value];
                    return;
                }
                if (typeof value === 'object' && value) {
                    forObject(value);
                }
            });
        }
    }


    function getDiff(data1, data2) {
        var newData1 = deepCloneKeepStyle(data1);
        var newData2 = deepCloneKeepStyle(data2);
        removeSame(newData1, newData2);
        return newData1;
        function removeSame(a, b) {
            _.each(a, function (value, key) {
                var d1 = value;
                var d2 = b[key] || {};
                if (JSON.stringify(d1) === JSON.stringify(d2)) {
                    delete a[key];
                    return;
                }
                if (key === 'style') {
                    var fields = _.keys(d1);
                    _.keys(d2).map(function (field) {
                        if (fields.indexOf(field) < 0) {
                            fields.push(field);
                        }
                    });
                    fields.map(function (field) {
                        if (d1[field] === d2[field]) {
                            delete d1[field];
                            return;
                        }
                        if (!d1.hasOwnProperty(field) && d2.hasOwnProperty(field)) {
                            d1[field] = '""';
                        }
                    });
                }
                else {
                    removeSame(d1, d2);
                }
            });
        }
    }


    return function (dataset, customModuleInfo, modules) {
        var result = {};
        customModuleInfo.map(function (item) {
            if (dataset[item.uuid] && modules[item.module] && modules[item.module].dataset) {
                var diff = getDiff(dataset[item.uuid], modules[item.module].dataset);
                if (_.keys(diff).length) {
                    result[item.uuid] = diff;
                }
            }
        });
        return result;
    };


});
