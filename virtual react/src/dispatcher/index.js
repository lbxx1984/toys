/**
 * @file 修改model的句柄
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {

    var _ = require('underscore');
    return _.extend(
        {
            set: function (key, value) {
                this.set(key, value);
            },
            fill: function (data) {
                this.fill(data);
            }
        },
        require('./stage'),
        require('./file'),
        require('./hotkey'),
        require('./operation')
    );

});
