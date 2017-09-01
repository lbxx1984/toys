/**
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const THREE = require('three');
   

    const CONFIG = {
        folder: {
            borderColor: '#FFFFFF',
            backgroundColor: '#4080ff',
            color: 'yellow'
        },
        file: {
            borderColor: '#000',
            backgroundColor: '#FFF',
            color: '#000'
        }
    };


    /**
     * 生成节点
     *
     * @param {Three.Vector3} param.pos 节点的位置
     * @param {string} param.path 绝对路径
     * @param {string} param.type folder or file
     * @return {THree.Mesh} 3D物体
     */
    return function (param) {
        if (!param.pos) return;
        let mesh = new THREE.Mesh(
            new THREE.BoxGeometry(100, 100, 100, 1, 1, 1),
            new THREE.MeshBasicMaterial({color: 0xffffff})
        );
        let config = CONFIG[param.type];
        let text = param.path.split('/').pop()
            .replace(/[A-Z]/g, i => '\n' + i)
            .split('\n')
            .filter(i => i.length);
        let canvas = document.createElement('canvas');
        let img = document.createElement('img');
        let ctx = canvas.getContext('2d');
        canvas.width = 128;
        canvas.height = 128;
        ctx.strokeStyle = config.borderColor;
        ctx.fillStyle = config.backgroundColor;
        ctx.lineWidth = 2;
        ctx.fillRect(0, 0, 128, 128);
        ctx.strokeRect(0, 0, 128, 128);
        ctx.font = '24px 宋体';
        ctx.fillStyle = config.color;
        let marginTop = Math.max(80 - 12 * text.length, 0);
        text.map(function (line, i) {
            ctx.fillText(line, 64 - line.length * 6, marginTop + i * 24);
        });
        img.src = canvas.toDataURL();
        mesh.material.map = new THREE.Texture(img);
        mesh.material.map.needsUpdate = true;
        mesh.material.needsUpdate = true;
        mesh.position.copy(param.pos);
        mesh.tc = {
            path: param.path,
            type: param.type,
            childVisible: true
        };
        return mesh;
    };


});
