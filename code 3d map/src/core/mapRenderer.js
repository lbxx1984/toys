/**
 * @file io处理工具
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const THREE = require('three');
    const CURVE_ANCHORS = 4;
    const CURVE_SEGMENTS = 200;
    const FOLDER_DISTANCE = 1000;
    const CURVE_COLORS = [
        0xd0d0d0, 0xff7575, 0xffaad5, 0xffa6ff, 0xd3a4ff, 0xE0E0E0, 0xFF9797, 0xFFC1E0, 0xFFBFFF,
        0xDCB5FF, 0xF0F0F0, 0xFFB5B5, 0xFFD9EC, 0xFFD0FF, 0xE6CAFF, 0xFCFCFC, 0xFFD2D2, 0xFFECF5,
        0xFFE6FF, 0xF1E1FF, 0xAAAAFF, 0x84C1FF, 0xA6FFFF, 0x96FED1, 0x93FF93, 0xB9B9FF, 0x97CBFF,
        0xBBFFFF, 0xADFEDC, 0xA6FFA6, 0xCECEFF, 0xACD6FF, 0xCAFFFF, 0xC1FFE4, 0xBBFFBB, 0xDDDDFF,
        0xC4E1FF, 0xD9FFFF, 0xD7FFEE, 0xCEFFCE, 0xECECFF, 0xD2E9FF, 0xECFFFF, 0xE8FFF5, 0xDFFFDF,
        0x73BF00, 0x8C8C00, 0xAE8F00, 0xD26900, 0xBB3D00, 0x82D900, 0xA6A600, 0xC6A300, 0xEA7500,
        0xD94600, 0x8CEA00, 0xC4C400, 0xD9B300, 0xFF8000, 0xF75000, 0x9AFF02, 0xE1E100, 0xEAC100,
        0xFF9224, 0xFF5809, 0xA8FF24, 0xF9F900, 0xFFD306, 0xFFA042, 0xFF8040, 0xB7FF4A, 0xFFFF37,
        0xFFDC35, 0xFFAF60, 0xFF8F59, 0xC2FF68, 0xFFFF6F, 0xFFE153, 0xFFBB77, 0xFF9D6F, 0xCCFF80,
        0xFFFF93, 0xFFE66F, 0xFFC78E, 0xFFAD86, 0xD3FF93, 0xFFFFAA, 0xFFED97, 0xFFD1A4, 0xFFBD9D,
        0xDEFFAC, 0xFFFFB9, 0xFFF0AC, 0xFFDCB9, 0xFFCBB3, 0xE8FFC4, 0xFFFFCE, 0xFFF4C1, 0xFFE4CA,
        0xFFDAC8, 0xEFFFD7, 0xFFFFDF, 0xFFF8D7, 0xFFEEDD, 0xFFE6D9, 0xB87070, 0xAFAF61, 0x6FB7B7,
        0x9999CC, 0xB766AD, 0xC48888, 0xB9B973, 0x81C0C0, 0xA6A6D2, 0xC07AB8, 0xCF9E9E, 0xC2C287,
        0x95CACA, 0xB8B8DC, 0xCA8EC2, 0xD9B3B3, 0xCDCD9A, 0xA3D1D1, 0xC7C7E2, 0xD2A2CC, 0xE1C4C4,
        0xD6D6AD, 0xB3D9D9, 0xD8D8EB, 0xDAB1D5, 0xEBD6D6, 0xDEDEBE, 0xC4E1E1, 0xE6E6F2, 0xE2C2DE,
        0xF2E6E6, 0xE8E8D0, 0xD1E9E9, 0xF3F3FA, 0xEBD3E8
    ];


    const dataset = require('../dataset');
    const fontLoader = new THREE.FontLoader();
    const {fileTreeConfig, fileMapConfig} = dataset;


    return function (me) {
        fontLoader.load('resource/fonts/helvetiker_regular.typeface.json', (font) => drawMap(me, font));
    };



    // 绘制地图
    function drawMap(me, font) {

        // 底层参数
        const cameraAngleB = me.props.cameraAngleB;
        const scene = me.scene;
        // 记录每个节点的3D位置
        let nodePositions = {
            'src': new THREE.Vector3(0, 0, 0)
        };
        // 每个节点开始画圈时的角度起点
        let nodeBeginA = {
            'src': 0
        };
        // 所有文字节点
        let text3dHash = [];
        // 正在操作的队列
        let reading = [];

        // /////////////////////生成所有文件夹节点
        // reading.push('src');
        while(reading.length) {
            // 创建正在遍历的节点
            const folder = reading.shift();
            const pos = nodePositions[folder];
            const textPos = pos.clone();
            textPos.y = 50;
            const box = folderFactory({pos});
            const text = textFactory({
                text: folder.split('/').pop(),
                font: font,
                cameraAngleB: cameraAngleB,
                isDirectory: true,
                pos: textPos
            });
            scene.add(box);
            scene.add(text);
            text3dHash.push(text);
            // 生成子目录数据
            const child = findChildFolders(folder);
            if (!child.length) continue;
            const a = nodeBeginA[folder];
            const d = 360 / child.length;
            child.map(function (path, i) {
                reading.push(path);
                nodeBeginA[path] = 180 - a - d * i;
                nodePositions[path] = new THREE.Vector3(
                    pos.x + FOLDER_DISTANCE * Math.cos((a + d * i) * 0.0175), 0,
                    pos.z + FOLDER_DISTANCE * Math.sin((a + d * i) * 0.0175)
                );
            });
        }

        // ///////////////////////记录所有文字物体
        me.text3dHash = text3dHash;
        // console.log(dataset);
    }


    // /////////////////////////////////////////////以下是工具方法
    function findChildFolders(path) {
        let result = [];
        if (!fileTreeConfig[path]) {
            return result;
        }
        let hash = fileTreeConfig[path];
        Object.keys(hash).map(key => {
            if (hash[key].isDirectory) {
                result.push(hash[key].fullpath);
            }
        });
        return result;
    }

    // function drawMap(me, font) {
    //     const {renderer, scene} = me;
    //     const file = fileFactory({
    //         pos: new THREE.Vector3(500, 0, -500)
    //     });
    //     const folder = folderFactory({
    //         pos: new THREE.Vector3(0, 0, 0)
    //     });
    //     const curve = curveFactory({
    //         begin: new THREE.Vector3(0, 0, 0),
    //         end: new THREE.Vector3(500, 0, -500)
    //     });
    //     const folderName = textFactory({
    //         text: 'src',
    //         font: font,
    //         cameraAngleB: me.props.cameraAngleB,
    //         isDirectory: true,
    //         pos: new THREE.Vector3(0, 50, 0)
    //     });
    //     const fileName = textFactory({
    //         text: 'main.js',
    //         font: font,
    //         cameraAngleB: me.props.cameraAngleB,
    //         isDirectory: false,
    //         pos: new THREE.Vector3(500, 50, -500)
    //     });
    //     const line = lineFactory({
    //         begin: new THREE.Vector3(0, 0, 0),
    //         end: new THREE.Vector3(500, 0, -500)
    //     });
    //     scene.add(file);
    //     scene.add(folder);
    //     scene.add(folderName);
    //     scene.add(fileName);
    //     scene.add(curve);
    //     scene.add(line);
    //     me.text3dHash = [folderName, fileName];
    // }



    // /////////////////////////////////////////////以下是3D物体生成工厂

    // 生成文字
    function textFactory(param) {
        let {text, font, cameraAngleB, isDirectory, pos} = param
        const container = new THREE.Object3D();
        container.rotation.y = Math.PI * 0.5 - Math.PI * cameraAngleB / 180;
        const mesh = new THREE.Mesh(
            new THREE.TextGeometry(text, {font: font, size: 50, height: 5, curveSegments: 2}),
            new THREE.MeshBasicMaterial({color: isDirectory ? 0xffff00 : 0xffffff})
        );
        mesh.geometry.computeBoundingBox();
        const {min, max} = mesh.geometry.boundingBox;
        mesh.position.set(min.x - 0.5 * (max.x - min.x), 0, 0);
        container.add(mesh);
        container.position.copy(pos);
        return container;
    }

    // 生成目录节点
    function folderFactory(param) {
        let mesh = new THREE.Mesh(
            new THREE.BoxGeometry(100, 100, 100, 1, 1, 1),
            new THREE.MeshPhongMaterial({color: 0x4080ff})
        );
        mesh.position.copy(param.pos);
        return mesh;
    }

    // 生成文件节点
    function fileFactory(param) {
        let mesh = new THREE.Mesh(
            new THREE.SphereGeometry(50, 50, 50),
            new THREE.MeshPhongMaterial({color: 0x4080ff})
        );
        mesh.position.copy(param.pos);
        return mesh;
    }

    // 生成节点间曲线
    function curveFactory(param) {
        let geometry = new THREE.Geometry();
        for (let i = 0; i < CURVE_SEGMENTS; i++) geometry.vertices.push(new THREE.Vector3());
        let material = new THREE.LineBasicMaterial({
            color: CURVE_COLORS[parseInt(Math.random() * CURVE_COLORS.length, 10)]
        });
        let points = [];
        for (let i = 0; i < CURVE_ANCHORS; i++) points.push(new THREE.Vector3());
        let curve = new THREE.CatmullRomCurve3(points);
        curve.mesh = new THREE.Line(geometry, material);
        curve.type = 'chordal';
        [
            param.begin,
            new THREE.Vector3(getInnerPoint('x', 0.33), getRandomY(), getInnerPoint('z', 0.33)),
            new THREE.Vector3(getInnerPoint('x', 0.67), getRandomY(), getInnerPoint('z', 0.67)),
            param.end
        ].map((p, i) => {
            curve.points[i].copy(p);
        });
        for (let i=0; i <CURVE_SEGMENTS; i++) {
            let p = curve.mesh.geometry.vertices[i];
            p.copy(curve.getPoint(i / (CURVE_SEGMENTS - 1)));
        }
        curve.mesh.geometry.verticesNeedUpdate = true;
        function getInnerPoint(axis, fix) {
            return param.begin[axis] + fix * (param.end[axis] - param.begin[axis]);
        }
        function getRandomY() {
            return 200 + Math.random() * 100;
        }
        return curve.mesh;
    }

    // 生成节点直线
    function lineFactory(param) {
        const material = new THREE.LineBasicMaterial({color: 0xffffff});
        const geometry = new THREE.Geometry();
        geometry.vertices.push(param.begin, param.end);
        return new THREE.Line(geometry, material);
    }


});
