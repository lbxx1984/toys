
define(function (require) {


    var _ = require('underscore');
    var operation = require('./operation');

    return {
        'hotkey:ctrl + s': function () {

        },
        'hotkey:alt + s': function () {
            this.fill({
                currentStageMode: 'select',
                currentWidget: '',
                selectedWidget: ''
            });
        },
        'hotkey:alt + d': function () {
            this.fill({
                currentStageMode: 'drag',
                currentWidget: '',
                selectedWidget: ''
            });
        },
        'hotkey:delete': function () {
            operation['operation-delete'].call(this);
        },
        'hotkey:ctrl + x': function () {
            operation['operation-cut'].call(this);
        },
        'hotkey:ctrl + c': function () {
            operation['operation-copy'].call(this);
        },
        'hotkey:ctrl + v': function () {
            operation['operation-paste'].call(this);
        },
        'hotkey:escape': function () {
            this.fill({
                currentStageMode: 'select',
                currentWidget: '',
                selectedWidget: ''
            });
        }
    };


});
