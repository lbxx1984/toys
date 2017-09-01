/**
 * @file 修改model的句柄
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const THREE = require('three');
    const _ = require('underscore');
    const hotkey = require('../core/hotkey');
    const math = require('../core/math');


    let lastIntersected = null;
    let meshes = null;


    function moveCamera(param) {
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
    }


    function rotateCamera(param) {
        const stageInfo = JSON.parse(JSON.stringify(this.get('stage')));
        const mouseDelta2D = param.mouseDelta2D;
        const dB = Math.abs(mouseDelta2D.x) > 3 ? 3 * mouseDelta2D.x / Math.abs(mouseDelta2D.x) : 0;
        const a = stageInfo.camera3D.cameraAngleA;
        let dA = Math.abs(mouseDelta2D.y) > 3 ? 3 * mouseDelta2D.y / Math.abs(mouseDelta2D.y) : 0;
        dA = a < 90 && a + dA > 90 ? 0 : dA;
        dA = a > -90 && a + dA < -90 ? 0 : dA;
        stageInfo.camera3D.cameraAngleA += dA;
        stageInfo.camera3D.cameraAngleB += dB;
        this.set('stage', stageInfo);
    }


    function hoverBox(param) {
        meshes = param.stage3D.meshes;
        const mesh = getObject3dByMouse3D(
            param.event.nativeEvent.offsetX,
            param.event.nativeEvent.offsetY,
            param.stage3D
        );
        if (lastIntersected) {
            lastIntersected.scale.x = lastIntersected.scale.y = lastIntersected.scale.z = 1;
        }
        lastIntersected = mesh;
        if (lastIntersected) {
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 2;
        }
    }


    function getObject3dByMouse3D(x, y, stage) {
        const vector = new THREE.Vector3(
            (x / stage.refs.container.offsetWidth) * 2 - 1,
            -(y / stage.refs.container.offsetHeight) * 2 + 1,
            1
        );
        vector.unproject(stage.camera);
        stage.raycaster.ray.set(stage.camera.position, vector.sub(stage.camera.position).normalize());
        const intersects = stage.raycaster.intersectObjects(meshes || []);
        return intersects.length ? intersects[0].object : null;
    }


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

        // 舞台被点击
        onStageClick() {
            if (!lastIntersected) return;
            // 切换文件夹下所有节点的显示隐藏
            const {type, path, childVisible} = lastIntersected.tc;
            if (type === 'folder') {
                lastIntersected.tc.childVisible = !childVisible;
                meshes.map(i => {
                    if (i.tc.path.indexOf(path + '/') !== 0) return;
                    i.tc.childVisible = i.visible = !childVisible;
                });
            }
        },

        // 修改3D鼠标
        changeMouse3D(point) {
            this.set('mouse3d', point);
        },

        // 移动摄像机
        'camera-move': function (param, dragging) {
            // 拾取舞台物体
            if (!dragging) {
                hoverBox.call(this, param);
                return;
            }
            // 旋转摄像机
            if (param.ctrlKey) {
                rotateCamera.call(this, param);
                return;
            }
            // 平移摄像机
            moveCamera.call(this, param);
        }
    };


});
