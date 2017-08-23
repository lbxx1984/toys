/**
 * @file 修改model的句柄
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const _ = require('underscore');
    const Dialog = require('fcui2/Dialog.jsx');
    const hotkey = require('../core/hotkey');
    const math = require('../core/math');
    const dialog = new Dialog();


    return {


        // update timer
        updateTimer() {
            this.set('timer', new Date().getTime());
        },


        // 修改3D摄像机
        changeCamera3D(param) {
            const stage = _.extend({}, this.get('stage'));
            stage.camera3D = _.extend({}, stage.camera3D, param);
            this.set('stage', stage);
        },


        // 修改3D鼠标
        changeMouse3D(point) {
            this.set('mouse3d', point);
        },

        // 移动摄像机
        'camera-move': function (param, dragging) {
            if (!dragging) return;
            let stage = param.stage3D;
            const angleB = stage.props.cameraAngleB;
            const speed = stage.props.cameraMoveSpeed;
            const cameraPos = stage.camera.position;
            const dx = stage.props.cameraRadius * param.mouseDelta2D.x * speed * 0.2 / stage.refs.container.offsetWidth;
            const dy = stage.props.cameraRadius * param.mouseDelta2D.y * speed * 0.2 / stage.refs.container.offsetHeight;
            let lookAt = stage.props.cameraLookAt;
            lookAt = {x: lookAt.x, y: lookAt.y, z: lookAt.z};
            if (Math.abs(stage.props.cameraAngleA) > 2) {
                lookAt.x -= Math.sin(Math.PI * angleB / 180) * dx;
                lookAt.z += Math.cos(Math.PI * angleB / 180) * dx;
                lookAt.x -= Math.cos(Math.PI * angleB / 180) * dy * Math.abs(cameraPos.y) / cameraPos.y;
                lookAt.z -= Math.sin(Math.PI * angleB / 180) * dy * Math.abs(cameraPos.y) / cameraPos.y;
            }
            else {
                lookAt.x -= Math.sin(Math.PI * angleB / 180) * dx;
                lookAt.z += Math.cos(Math.PI * angleB / 180) * dx;
                lookAt.y += dy;
            }
            stage = _.extend({}, this.get('stage'));
            stage.camera3D = _.extend({}, stage.camera3D, {lookAt: lookAt});
            this.set('stage', stage);
        },
    };


});
