/**
 * @file io处理工具
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const THREE = require('three');
    const dataset = require('../dataset');

    const fontLoader = new THREE.FontLoader();

    return function (me) {

        fontLoader.load('resource/fonts/helvetiker_regular.typeface.json', function (font) {

            const renderer = me.renderer;
            const scene = me.scene;

            const file = fileAnchor();
            const folder = folderAnchor();
            const folderName = textAnchor('src', font, me.props.cameraAngleB, true);
            const fileName = textAnchor('main.js', font, me.props.cameraAngleB);

            file.position.set(500, 0, 0);
            folder.position.set(0, 0, 0);
            folderName.position.set(0, 50, 0);
            fileName.position.set(500, 50, 0);
            
            scene.add(file);
            scene.add(folder);
            scene.add(folderName);
            scene.add(fileName);
            me.text3dHash = [folderName, fileName];
        });
    };



    function textAnchor(str, font, cameraAngleB, isDirectory) {
        const textContainer = new THREE.Object3D();
        textContainer.rotation.y = Math.PI * 0.5 - Math.PI * cameraAngleB / 180;
        const text = new THREE.Mesh(
            new THREE.TextGeometry(str, {font: font, size: 50, height: 5, curveSegments: 2}),
            new THREE.MeshBasicMaterial({color: isDirectory ? 0xffff00 : 0xffffff})
        );
        text.geometry.computeBoundingBox();
        const {min, max} = text.geometry.boundingBox;
        text.position.set(min.x - 0.5 * (max.x - min.x), 0, 0);
        textContainer.add(text);
        return textContainer;
    }


    function folderAnchor() {
        return new THREE.Mesh(
            new THREE.BoxGeometry(100, 100, 100, 1, 1, 1),
            new THREE.MeshPhongMaterial({color: 0x4080ff})
        );
    }


    function fileAnchor() {
        return new THREE.Mesh(
            new THREE.SphereGeometry(50, 50, 50),
            new THREE.MeshPhongMaterial({color: 0x4080ff})
        );
    }


});
