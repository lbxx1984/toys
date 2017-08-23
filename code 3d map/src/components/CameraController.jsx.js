/**
 * @file 摄像机控制器
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const React = require('react');   
    const THREE = require('three');
    const CTRL_FACE = {
        'font': [20, 0, 0, 0, 0.5, 0, 30, 30, 0],
        'back': [-20, 0, 0, 0, -0.5, 0, 30, 30, 0],
        'top': [0, 20, 0, -0.5, 0, 0, 30, 30, 0],
        'bottom': [0, -20, 0, 0.5, 0, 0, 30, 30, 0],
        'left': [0, 0, 20, 0, 0, 0, 30, 30, 0],
        'right': [0, 0, -20, 0, -1, 0, 30, 30, 0],
        'font_left_top': [17.5, 17.5, 17.5, 0, 0, 0, 5, 5, 5],
        'font_right_top': [17.5, 17.5, -17.5, 0, 0, 0, 5, 5, 5],
        'left_top_back': [-17.5, 17.5, 17.5, 0, 0, 0, 5, 5, 5],
        'back_top_right': [-17.5, 17.5, -17.5, 0, 0, 0, 5, 5, 5],
        'left_font_bottom': [17.5, -17.5, 17.5, 0, 0, 0, 5, 5, 5],
        'font_right_bottom': [17.5, -17.5, -17.5, 0, 0, 0, 5, 5, 5],
        'left_back_bottom': [-17.5, -17.5, 17.5, 0, 0, 0, 5, 5, 5],
        'right_back_bottom': [-17.5, -17.5, -17.5, 0, 0, 0, 5, 5, 5],
        'left_top': [0, 17.5, 17.5, 0, 0, 0, 30, 5, 5],
        'left_bottom': [0, -17.5, 17.5, 0, 0, 0, 30, 5, 5],
        'top_right': [0, 17.5, -17.5, 0, 0, 0, 30, 5, 5],
        'bottom_right': [0, -17.5, -17.5, 0, 0, 0, 30, 5, 5],
        'top_font': [17.5, 17.5, 0, 0, 0, 0, 5, 5, 30],
        'bottom_font': [17.5, -17.5, 0, 0, 0, 0, 5, 5, 30],
        'back_bottom': [-17.5, -17.5, 0, 0, 0, 0, 5, 5, 30],
        'top_back': [-17.5, 17.5, 0, 0, 0, 0, 5, 5, 30],
        'font_left': [17.5, 0, 17.5, 0, 0, 0, 5, 30, 5],
        'font_right': [17.5, 0, -17.5, 0, 0, 0, 5, 30, 5],
        'back_right': [-17.5, 0, -17.5, 0, 0, 0, 5, 30, 5],
        'back_left': [-17.5, 0, 17.5, 0, 0, 0, 5, 30, 5]
    };
    const ANGLE_CONFIG = {
        'font_left_top': [45, 45],
        'left_top_back': [45, 135],
        'back_top_right': [45, 225],
        'font_right_top': [45, 315],
        'left_font_bottom': [-45, 45],
        'left_back_bottom': [-45, 135],
        'right_back_bottom': [-45, 225],
        'font_right_bottom': [-45, 315],
        'left_top': [45, 90],
        'left_bottom': [-45, 90],
        'top_right': [45, 270],
        'bottom_right': [-45, 270],
        'top_font': [45, 0],
        'bottom_font': [-45, 0],
        'top_back': [45, 180],
        'back_bottom': [-45, 180],
        'font_left': [0, 45],
        'font_right': [0, 315],
        'back_right': [0, 225],
        'back_left': [0, 135],
        'left': [0, 90],
        'right': [0, 270],
        'font': [0, 0],
        'back': [0, 180],
        'top': [89, null],
        'bottom': [-89, null]
    };
    const animation = require('../core/animation');


    return React.createClass({

        contextTypes: {
            dispatch: React.PropTypes.func
        },

        // @override
        getDefaultProps: function () {
            return {
                cameraRadius: 90,
                cameraAngleA: 40,
                cameraAngleB: 45,
                cameraMoveSpeed: 2,
                textureColor: 0xffffff,
                hoverColor: 0xD97915,
            };
        },

        // @override
        componentDidMount: function () {

            const width = this.refs.container.offsetWidth;
            const height = this.refs.container.offsetHeight;
            const me = this;

            // 舞台部件
            this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
            this.scene = new THREE.Scene();
            this.renderer = new THREE.WebGLRenderer({alpha: true});
            this.raycaster = new THREE.Raycaster();
            this.refs.container.appendChild(this.renderer.domElement);
            this.scene.add(new THREE.AmbientLight(0xffffff));
            this.renderer.setSize(width, height);
            this.intersected = null;
            updateCameraPosition(this, this.props);

            // 开启渲染引擎
            animation.add('cameraController', animaterFactory(this));

            // 创建控制面
            const textureloader = new THREE.TextureLoader();
            for (const key in CTRL_FACE) {
                const item = CTRL_FACE[key];
                const url = key.indexOf('_') < 0
                    ? 'resource/textures/' + key + '_en.png' : 'resource/textures/background.png';
                const geometry = key.indexOf('_') < 0
                    ? new THREE.PlaneGeometry(item[6], item[7])
                    : new THREE.BoxGeometry(item[6], item[7], item[8]);
                const position = [item[0], item[1], item[2]];
                const rotation = [Math.PI * item[3], Math.PI * item[4], Math.PI * item[5]];
                textureloader.load(url, textureLoadedHandler(geometry, position, rotation, key));
            }

            function textureLoadedHandler(geometry, pos, rot, key) {
                return function (texture) {
                    const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                        map: texture,
                        color: me.props.textureColor
                    }));
                    mesh.position.set(pos[0], pos[1], pos[2]);
                    mesh.rotation.set(rot[0], rot[1], rot[2]);
                    mesh.tid = key;
                    me.scene.add(mesh);
                }
            }
        },

        // @override
        componentWillReceiveProps: function (nextProps) {
            if (
                nextProps.cameraRadius !== this.props.cameraRadius
                || nextProps.cameraAngleA !== this.props.cameraAngleA
                || nextProps.cameraAngleB !== this.props.cameraAngleB
            ) {
                updateCameraPosition(this, nextProps);
            }
        },

        // @override
        componentWillUnmount: function () {
            this.intersected = null;
            animation.remove('cameraController');
        },

        onMouseMove: function (e) {
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            const width = this.refs.container.offsetWidth;
            const height = this.refs.container.offsetHeight;
            const vector = new THREE.Vector3((x / width) * 2 - 1, -(y / height) * 2 + 1, 1);
            const camera = this.camera;
            const raycaster = this.raycaster;
            vector.unproject(camera);
            raycaster.ray.set(camera.position, vector.sub(camera.position).normalize());
            const intersects = raycaster.intersectObjects(this.scene.children);
            if (intersects.length > 0) {
                if (this.intersected !== intersects[0].object) {
                    if (this.intersected) {
                        this.intersected.material.setValues({color: this.props.textureColor});
                    }
                    this.intersected = intersects[0].object;
                    this.intersected.material.setValues({color: this.props.hoverColor});
                }
            }
            else if (this.intersected) {
                this.intersected.material.setValues({color: this.props.textureColor});
                this.intersected = null;
            }
        },

        onMouseDown: function (e) {
            this.mousedown = true;
            this.props.parentStage.isCameraRotating = true;
            this.mousePos = [e.clientX, e.clientY];
            window.addEventListener('mousemove', this.onWindowMouseMove);
            window.addEventListener('mouseup', this.onWindowMouseUp);
        },

        onWindowMouseMove: function (e) {
            const db = e.clientX - this.mousePos[0]; 
            let da = e.clientY - this.mousePos[1];
            let a = this.props.cameraAngleA;
            let b = this.props.cameraAngleB;
            if (da === 0 && db === 0) return;
            this.mousePos = [e.clientX, e.clientY];
            da = this.props.cameraMoveSpeed * da * 90 / Math.PI / window.screen.availHeight;
            da = a < 90 && a + da > 90 ? 0 : da;
            da = a > -90 && a + da < -90 ? 0 : da;
            a += da;
            b += this.props.cameraMoveSpeed * db * 90 / Math.PI / window.screen.availWidth;
            b = b > 360 ? b - 360 : b;
            b = b < 0 ? b + 360 : b;
            this.props.parentStage.isCameraRotating = true;
            this.context.dispatch('changeCamera3D', {
                cameraAngleA: a,
                cameraAngleB: b
            });
        },

        onWindowMouseUp: function (e) {
            this.mousedown = false;
            this.props.parentStage.isCameraRotating = false;
            window.removeEventListener('mousemove', this.onWindowMouseMove);
            window.removeEventListener('mouseup', this.onWindowMouseUp);
        },

        onMouseUp: function (e) {
            this.mousedown = false;
            this.props.parentStage.isCameraRotating = false;
            if (this.intersected == null) return;
            const c = ANGLE_CONFIG[this.intersected.tid];
            this.context.dispatch('changeCamera3D', {
                cameraAngleA: c[0] != null ? c[0] : this.props.cameraAngleA,
                cameraAngleB: c[1] != null ? c[1] : this.props.cameraAngleB
            });
        },

        onMouseOut: function () {
            if (this.intersected) {
                this.intersected.material.setValues({color: this.props.textureColor});
            }
            this.intersected = null;
        },

        render: function () {
            const containerProps = {
                className: 'tc-camera-controller',
                ref: 'container',
                onMouseMove: this.onMouseMove,
                onMouseDown: this.onMouseDown,
                onMouseUp: this.onMouseUp,
                onMouseOut: this.onMouseOut
            };
            return (
                <div {...containerProps}></div>
            );
        }
    });


    // 设置摄像机位置
    function updateCameraPosition(me, props) {
        props = props || me.props;
        const cameraAngleA = props.cameraAngleA;
        const cameraAngleB = props.cameraAngleB;
        const cameraRadius = props.cameraRadius;
        const cameraLookAt = {x: 0, y: 0, z: 0};
        const y = cameraRadius * Math.sin(Math.PI * cameraAngleA / 180);
        const x = cameraRadius * Math.cos(Math.PI * cameraAngleA / 180) * Math.cos(Math.PI * cameraAngleB / 180);
        const z = cameraRadius * Math.cos(Math.PI * cameraAngleA / 180) * Math.sin(Math.PI * cameraAngleB / 180);
        me.camera.position.set(
            x + cameraLookAt.x,
            y + cameraLookAt.y,
            z + cameraLookAt.z
        );
    }


    // 渲染器工厂
    function animaterFactory(me) {
        return function () {
            me.camera.lookAt({x: 0, y: 0, z: 0});
            me.renderer.render(me.scene, me.camera);
        };
    }


});
