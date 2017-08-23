/**
 * @file 主启动
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const THREE = require('three');
    const ReactDOM = require('react-dom');
    const React = require('react');
    const _ = require('underscore');


    const config = require('./config');
    const App = require('./App.jsx');
    const dispatcher = require('./dispatcher/index');
    const model = require('./core/model');
    const hotkey = require('./core/hotkey');


    model.fill(config);
    model.onChange = function (store) {
        render(store);
    };
    render(model.store);


    function render(store) {
        let props = _.extend({}, store, {dispatch: dispatch});
        ReactDOM.render(React.createElement(App, props), document.getElementById('main'));
    }


    function dispatch() {
        if (arguments.length === 0) return;
        var args = [].slice.apply(arguments);
        var handler = args.shift();
        if (typeof handler !== 'string') {
            args.unshift(handler);
            handler = typeof handler.type === 'string' ? handler.type : '';
        }
        if (typeof dispatcher[handler] === 'function') {
            return dispatcher[handler].apply(model, args);
        }
    }


    function moveCameraByKeyboard(angle, direction) {
        let stage = JSON.parse(JSON.stringify(model.store.stage));
        stage.camera3D[angle] += direction;
        if (angle === 'cameraAngleA') {
            stage.camera3D[angle] = Math.min(stage.camera3D[angle], 89);
            stage.camera3D[angle] = Math.max(stage.camera3D[angle], -89);
        }
        model.set('stage', stage);
    }


    hotkey.on('arrowdown', function () {
        moveCameraByKeyboard('cameraAngleA', -1);
    });
    hotkey.on('arrowup', function () {
        moveCameraByKeyboard('cameraAngleA', 1);
    });
    hotkey.on('arrowright', function () {
        moveCameraByKeyboard('cameraAngleB', 1);
    });
    hotkey.on('arrowleft', function () {
        moveCameraByKeyboard('cameraAngleB', -1);
    });

});
