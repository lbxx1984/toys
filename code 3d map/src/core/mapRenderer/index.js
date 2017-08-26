/**
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const dataset = require('../../dataset');
    const getNodeLocation = require('./getNodeLocation1');

    const getBoxGeometry = require('./getBoxGeometry');
    const getLineGeometry = require('./getLineGeometry');
    const getCurveGeometry = require('./getCurveGeometry');

    const nodeLocations = getNodeLocation(dataset);


    return function (me) {

        // 底层参数
        const cameraAngleB = me.props.cameraAngleB;
        const cameraPosition = me.camera.position;
        const {fileTreeConfig, fileMapConfig} = dataset;
        const scene = me.scene;

        // /////////////////////生成所有节点
        let reading = ['src'];
        while(reading.length) {
            // 创建节点
            const folder = reading.shift();
            const mesh = getBoxGeometry({
                pos: nodeLocations[folder],
                path: folder,
                type: 'folder'
            });
            mesh && scene.add(mesh);
            // 遍历孩子，如果是文件，生成节点，如果是目录，压栈
            if (!fileTreeConfig[folder]) continue;
            const children = fileTreeConfig[folder];
            Object.keys(children).map(function (subPath) {
                let child = children[subPath];
                // 生成父子关系连线
                const line = getLineGeometry({
                    begin: nodeLocations[folder],
                    end: nodeLocations[child.fullpath]
                });
                line && scene.add(line);
                if (child.isDirectory) {
                    reading.push(child.fullpath);
                    return;
                }
                const mesh = getBoxGeometry({
                    pos: nodeLocations[child.fullpath],
                    path: child.fullpath,
                    type: 'file'
                });
                mesh && scene.add(mesh);
            });
        }

        // /////////////////////生成依赖关系曲线
        Object.keys(fileMapConfig).map(function (beginPath) {
            if (!fileMapConfig[beginPath].deps.length || !nodeLocations[beginPath]) return;
            fileMapConfig[beginPath].deps.map(function (endPath) {
                const curve = getCurveGeometry({
                    begin: nodeLocations[beginPath],
                    end: nodeLocations[endPath]
                });
                scene.add(curve);
            });
        });

    }

});
