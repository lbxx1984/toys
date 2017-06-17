

// 加载依赖

var THREE = require('../dep/three.min');
var GPUComputationRenderer = require('../dep/GPUComputationRenderer');
var BirdGeometry = require('../dep/BirdGeometry');
window.THREE = THREE;


// 初始化全局配置
var BOUNDS = 800;
var BOUNDS_HALF = BOUNDS / 2;
var WIDTH = 32;
var BIRDS = WIDTH * WIDTH;
var WINDOW_WIDTH = document.documentElement.clientWidth;
var WINDOW_HEIGHT = document.documentElement.clientHeight;
var mouseX = 0;
var mouseY = 0;
var windowHalfX = WINDOW_WIDTH / 2;
var windowHalfY = WINDOW_HEIGHT / 2;
var last = performance.now();
var positionUniforms, velocityUniforms, birdUniforms, gpuCompute, positionVariable, velocityVariable;
var renderer, scene, camera, container;


// 支持检测
var support = (function () {
    try {
        var canvas = document.createElement('canvas');
        return !!(
            window.WebGLRenderingContext
            && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch (e) {
        return false;
    }
})();


support && init();


function init() {

    // 初始化舞台组件
    container = document.getElementById('background-container');
    camera = new THREE.PerspectiveCamera(75, WINDOW_WIDTH / WINDOW_HEIGHT, 1, 3000);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

    // 设置舞台
    camera.position.z = 350;
    scene.fog = new THREE.Fog(0xffffff, 100, 1000);
    renderer.setClearColor(scene.fog.color);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
    container.appendChild(renderer.domElement);

    // gpu计算器
    gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, renderer);
    positionVariable = gpuCompute.addVariable(
        'texturePosition',
        require('../dep/fragmentShaderPosition'),
        fillPositionTexture(gpuCompute.createTexture())
    );
    velocityVariable = gpuCompute.addVariable(
        'textureVelocity',
        require('../dep/fragmentShaderVelocity'),
        fillVelocityTexture(gpuCompute.createTexture())
    );
    gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);
    gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);
    positionUniforms = positionVariable.material.uniforms;
    velocityUniforms = velocityVariable.material.uniforms;
    positionUniforms.time = {value: 0.0};
    positionUniforms.delta = {value: 0.0};
    velocityUniforms.time = {value: 1.0};
    velocityUniforms.delta = {value: 0.0};
    velocityUniforms.testing = {value: 1.0};
    velocityUniforms.seperationDistance = {value: 20.0};
    velocityUniforms.alignmentDistance = {value: 20.0};
    velocityUniforms.cohesionDistance = {value: 20.0};
    velocityUniforms.freedomFactor = {value: 0.75};
    velocityUniforms.predator = {value: new THREE.Vector3()};
    velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed(2);
    velocityVariable.wrapS = THREE.RepeatWrapping;
    velocityVariable.wrapT = THREE.RepeatWrapping;
    positionVariable.wrapS = THREE.RepeatWrapping;
    positionVariable.wrapT = THREE.RepeatWrapping;
    gpuCompute.init();

    // 鸟
    birdUniforms = {
        color: {value: new THREE.Color(0xff2200)},
        texturePosition: {value: null},
        textureVelocity: {value: null},
        time: {value: 1.0},
        delta: {value: 0.0}
    };
    var birdMesh = new THREE.Mesh(
        new THREE.BirdGeometry(BIRDS, WIDTH),
        new THREE.ShaderMaterial({
            uniforms: birdUniforms,
            vertexShader: require('../dep/birdVS'),
            fragmentShader: require('../dep/birdFS'),
            side: THREE.DoubleSide
        })
    );
    birdMesh.rotation.y = Math.PI / 2;
    birdMesh.matrixAutoUpdate = false;
    birdMesh.updateMatrix();
    scene.add(birdMesh);

    // 绑定事件
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouch, false);
    document.addEventListener('touchmove', onDocumentTouch, false);
    document.addEventListener('touchend', onDocumentTouch, false);

    // 开启渲染
    animate();
}


function render() {
    var now = performance.now();
    var delta = (now - last) / 1000;
    if (delta > 1) delta = 1;
    last = now;
    positionUniforms.time.value = now;
    positionUniforms.delta.value = delta;
    velocityUniforms.time.value = now;
    velocityUniforms.delta.value = delta;
    birdUniforms.time.value = now;
    birdUniforms.delta.value = delta;
    velocityUniforms.predator.value.set(0.5 * mouseX / windowHalfX, - 0.5 * mouseY / windowHalfY, 0);
    mouseX = 10000;
    mouseY = 10000;
    gpuCompute.compute();
    birdUniforms.texturePosition.value = gpuCompute.getCurrentRenderTarget(positionVariable).texture;
    birdUniforms.textureVelocity.value = gpuCompute.getCurrentRenderTarget(velocityVariable).texture;
    renderer.render(scene, camera);
}


function animate() {
    requestAnimationFrame(animate);
    render();
}


function onWindowResize() {
    WINDOW_WIDTH = document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight;
    windowHalfX = WINDOW_WIDTH / 2;
    windowHalfY = WINDOW_HEIGHT / 2;
    camera.aspect = WINDOW_WIDTH / WINDOW_HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
}


function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}


function onDocumentTouch(event) {
    if (event.touches.length) {
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}


function fillPositionTexture(texture) {
    var theArray = texture.image.data;
    for (var k = 0, kl = theArray.length; k < kl; k += 4) {
        var x = Math.random() * BOUNDS - BOUNDS_HALF;
        var y = Math.random() * BOUNDS - BOUNDS_HALF;
        var z = Math.random() * BOUNDS - BOUNDS_HALF;
        theArray[ k + 0 ] = x;
        theArray[ k + 1 ] = y;
        theArray[ k + 2 ] = z;
        theArray[ k + 3 ] = 1;
    }
    return texture;
}


function fillVelocityTexture(texture) {
    var theArray = texture.image.data;
    for (var k = 0, kl = theArray.length; k < kl; k += 4) {
        var x = Math.random() - 0.5;
        var y = Math.random() - 0.5;
        var z = Math.random() - 0.5;
        theArray[ k + 0 ] = x * 10;
        theArray[ k + 1 ] = y * 10;
        theArray[ k + 2 ] = z * 10;
        theArray[ k + 3 ] = 1;
    }
    return texture;
}
