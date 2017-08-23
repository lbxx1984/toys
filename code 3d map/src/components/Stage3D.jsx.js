/**
 * @file 3D 舞台
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const React = require('react');   
    const THREE = require('three');
    const _ = require('underscore');


    const CameraController = require('./CameraController.jsx');
    const animation = require('../core/animation');


    // 渲染器工厂
    function animaterFactory(me) {
        return function () {
            me.camera.lookAt(me.props.cameraLookAt);
            me.renderer.render(me.scene, me.camera);
        };
    }

    // 获取根据坐标纸获取3D鼠标位置
    function getMouse3D(x, y, me, geo) {
        const width = me.refs.container.offsetWidth;
        const height = me.refs.container.offsetHeight;
        me.raycaster.setFromCamera(new THREE.Vector3((x / width) * 2 - 1, - (y / height) * 2 + 1, 0), me.camera);
        const intersects = me.raycaster.intersectObjects([geo]);
        return intersects.length > 0 ? intersects[0].point.clone() : new THREE.Vector3();
    }

    // 更新摄像机位置
    function updateCameraPosition(me, props) {
        props = props || me.props;
        const cameraAngleA = props.cameraAngleA;
        const cameraAngleB = props.cameraAngleB;
        const cameraRadius = props.cameraRadius;
        const coordinateContainer = me.coordinateContainer;
        const grid = me.grid;
        const y = cameraRadius * Math.sin(Math.PI * cameraAngleA / 180);
        const x = cameraRadius * Math.cos(Math.PI * cameraAngleA / 180) * Math.cos(Math.PI * cameraAngleB / 180);
        const z = cameraRadius * Math.cos(Math.PI * cameraAngleA / 180) * Math.sin(Math.PI * cameraAngleB / 180);
        if (Math.abs(cameraAngleA) < 2) {
            coordinateContainer.rotation.z = grid.rotation.z = Math.PI * 0.5 - Math.PI * cameraAngleB / 180;
            coordinateContainer.rotation.x = grid.rotation.x = Math.PI * 1.5;
        }
        else {
            coordinateContainer.rotation.z = grid.rotation.z = 0;
            coordinateContainer.rotation.x = grid.rotation.x = 0;
        }
        me.camera.position.set(
            x + props.cameraLookAt.x,
            y + props.cameraLookAt.y,
            z + props.cameraLookAt.z
        );
    }

    // 更新摄像机属性
    function updateCameraInfo(nextProps, me) {
        if (
            nextProps.cameraRadius !== me.props.cameraRadius
            || nextProps.cameraAngleA !== me.props.cameraAngleA
            || nextProps.cameraAngleB !== me.props.cameraAngleB
            || nextProps.cameraLookAt !== me.props.cameraLookAt
        ) {
            updateCameraPosition(me, nextProps);
        }
    }

    // 更新坐标值
    function updateScene(nextProps, me) {
        if (nextProps.gridSize !== me.props.gridSize || nextProps.gridStep !== me.props.gridStep) {
            me.scene.remove(me.grid);
            me.grid = new THREE.GridHelper(
                nextProps.gridSize, nextProps.gridStep,
                nextProps.colorGrid, nextProps.colorGrid
            );
            me.grid.visible = nextProps.gridVisible;
            me.scene.add(me.grid);
        }
        if (nextProps.gridVisible !== me.props.gridVisible) {
            me.grid.visible = nextProps.gridVisible;
            me.axis.visible = nextProps.gridVisible;
        }
    }

    // 舞台技术测试
    function test(me) {
        // const renderer = me.renderer;
        // const camera = me.camera;
        // const scene = me.scene;
        // const mshBox = new THREE.Mesh(
        //     new THREE.SphereGeometry(20, 20, 20),
        //     new THREE.MeshPhongMaterial({color: 0x4080ff})
        // );
        // mshBox.position.set(100, 0, 200);
        // scene.add(mshBox);
        // console.log(camera.rotation);
    }


    return React.createClass({

        contextTypes: {
            dispatch: React.PropTypes.func
        },

        // @override
        getDefaultProps: function () {
            return {
                // 摄像机到期观察点的距离，可以理解为焦距
                cameraRadius: 1000,
                // 摄像机视线与XOZ平面夹角
                cameraAngleA: 40,
                // 摄像机视线在XOZ平面投影与X轴夹角
                cameraAngleB: 45,
                // 摄像机的观察点，3D坐标
                cameraLookAt: {x: 0, y: 0, z: 0},
                // 鼠标拖拽舞台时，摄像机的移动速度
                cameraMoveSpeed: 4,
                // 是否显示网格
                gridVisible: true,
                // 网格的总尺寸
                gridSize: 2500,
                // 网格的单元格大小
                gridStep: 50,
                // 编辑器背景颜色
                colorStage: 0xffffff,
                // 网格的颜色
                colorGrid: 0xffffff
            };
        },

        componentDidMount: function () {
            const me = this;
            this.mousedown = false;
            this.mouseCurrent2D = {x: 0, y: 0};
            this.mouseCurrent3D = {x: 0, y: 0, z: 0};
            // 射线，用于鼠标拾取物体
            this.raycaster = new THREE.Raycaster();
            // 网格
            this.grid = new THREE.GridHelper(
                this.props.gridSize, this.props.gridStep,
                this.props.colorGrid, this.props.colorGrid
            );
            // 坐标轴
            this.axis = new THREE.AxisHelper(200);
            // 坐标纸，不可见，专门显示鼠标事件
            this.coordinate = new THREE.Mesh(
                new THREE.PlaneGeometry(10000, 10000, 1, 1),
                new THREE.MeshBasicMaterial({visible: false, side: THREE.DoubleSide})
            );
            // 坐标纸容器，主要作用是接受对网格的操作
            this.coordinateContainer = new THREE.Object3D();
            // 3D摄像机
            this.camera = new THREE.PerspectiveCamera(
                60, this.refs.container.offsetWidth / this.refs.container.offsetHeight, 1, 20000
            );
            // 3D场景
            this.scene = new THREE.Scene();
            // WebGL渲染器
            this.renderer = new THREE.WebGLRenderer({antialias: true});

            // 初始化舞台
            this.scene.add(this.grid);
            this.scene.add(this.axis);
            this.scene.add(this.coordinateContainer);
            this.grid.visible = this.props.gridVisible;
            this.axis.visible = this.props.gridVisible;
            this.coordinate.rotation.x = Math.PI * 0.5;
            this.coordinateContainer.add(this.coordinate);
            this.renderer.setClearColor(this.props.colorStage);
            this.renderer.setSize(this.refs.container.offsetWidth - 1, this.refs.container.offsetHeight);
            this.refs.container.appendChild(this.renderer.domElement);
            updateCameraPosition(this, this.props);
            
            // 绑定事件
            window.addEventListener('resize', this.onResize);
            this.refs.container.addEventListener('mousewheel', this.onMouseWheel);

            // 开启渲染引擎
            animation.add('stage3d', animaterFactory(this));  
            // 加载自定义对象
            test(this);
        },

        componentWillReceiveProps: function (nextProps) {
            updateCameraInfo(nextProps, this);
            updateScene(nextProps, this);
        },

        componentWillUnmount: function () {
            animation.remove('stage3d');
            window.removeEventListener('resize', this.onResize);
            this.refs.container.removeEventListener('mousewheel', this.onMouseWheel);
        },

        onMouseWheel: function (evt) {
            let r = this.props.cameraRadius - 0.2 * this.props.cameraRadius * evt.wheelDelta
                * this.props.cameraMoveSpeed / this.refs.container.offsetWidth;
            r = Math.max(r, 50);
            r = Math.min(r, 5000);
            this.context.dispatch('changeCamera3D', {cameraRadius: r});
            evt.stopPropagation();
            return false;
        },

        onResize: function () {
            this.camera.aspect = this.refs.container.offsetWidth / this.refs.container.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.refs.container.offsetWidth - 1, this.refs.container.offsetHeight);
        },

        onMouseMove: function (e) {
            const mouse2D = {x: e.clientX, y: e.clientY};
            const mouse3D = getMouse3D(e.nativeEvent.offsetX, e.nativeEvent.offsetY, this, this.coordinate);
            const mouseDelta2D = {
                x: mouse2D.x - this.mouseCurrent2D.x,
                y: mouse2D.y - this.mouseCurrent2D.y
            };
            const mouseDelta3D = {
                x: mouse3D.x - this.mouseCurrent3D.x,
                y: mouse3D.y - this.mouseCurrent3D.y,
                z: mouse3D.z - this.mouseCurrent3D.z
            };
            this.mouseCurrent2D = mouse2D;
            this.mouseCurrent3D = mouse3D;
            this.context.dispatch('changeMouse3D', mouse3D);
            const callbackParam = {
                event: e,
                cameraInfo: {
                    radius: this.props.cameraRadius,
                    angleA: this.props.cameraAngleA,
                    angleB: this.props.cameraAngleB,
                    lookAt: this.props.cameraLookAt
                },
                stage3D: this,
                mouseDown2D: this.mouseDown2D,
                mouseDown3D: this.mouseDown3D,
                mouseCurrent2D: mouse2D,
                mouseCurrent3D: mouse3D,
                mouseDelta2D: mouseDelta2D,
                mouseDelta3D: mouseDelta3D
            };
            // 拖拽命令
            if (this.props.tool && this.mousedown && !this.isCameraRotating) {
                this.context.dispatch(this.props.tool, callbackParam, true);
                return;
            }
            // 普通鼠标移动
            if (this.props.tool && !this.isCameraRotating) {
                this.context.dispatch(this.props.tool, callbackParam, false);
            }
        },

        onMouseDown: function (e) {
            this.mousedown = e.nativeEvent.button === 0;
            this.mouseDown2D = {x: e.clientX, y: e.clientY};
            this.mouseDown3D = getMouse3D(e.nativeEvent.offsetX, e.nativeEvent.offsetY, this, this.coordinate);
            this.mouseCurrent2D = {x: e.clientX, y: e.clientY};
            this.mouseCurrent3D = this.mouseDown3D.clone();
        },

        onMouseUp: function (e) {
            this.mousedown = false;
            this.mouseDown2D = {x: 0, y: 0};
            this.mouseDown3D = {x: 0, y: 0, z: 0};
            this.mouseCurrent2D = {x: 0, y: 0};
            this.mouseCurrent3D = {x: 0, y: 0, z: 0};
        },

        onContextMenu: function (e) {
            this.context.dispatch('stage3d-context-menu');
            e.stopPropagation();
            e.preventDefault();
        },

        render: function () {
            const containerProps = {
                className: 'tc-stage',
                ref: 'container',
                style: this.props.style,
                onMouseMove: this.onMouseMove,
                onMouseDown: this.onMouseDown,
                onMouseUp: this.onMouseUp,
                onContextMenu: this.onContextMenu
            };
            const controllerProps = {
                parentStage: this,
                cameraAngleA: this.props.cameraAngleA,
                cameraAngleB: this.props.cameraAngleB
            };
            return (
                <div {...containerProps}>
                    <CameraController {...controllerProps}/>
                </div>
            );
        }
    });

});
