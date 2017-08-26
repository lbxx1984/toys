/**
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const THREE = require('three');


    /**
     * 生成节点直线
     *
     * @param {Three.Vector3} param.begin 起点
     * @param {Three.Vector3} param.end 终点
     */
    return function (param) {
        if (!param.begin || !param.end) return;
        const material = new THREE.LineBasicMaterial({color: 0x000000});
        const geometry = new THREE.Geometry();
        geometry.vertices.push(param.begin, param.end);
        return new THREE.Line(geometry, material);
    }


});
