/**
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const THREE = require('three');


    return function (dataset) {


        const fileTreeConfig = dataset.fileTreeConfig;
        let reading = ['src'];
        let totalLevel = 0;
        let result = {};
        

        // 生成文件层级结构，生成一个文件锥
        while (reading.length) {
            let path = reading.shift();
            let level = path.split('/').length - 1;
            let group = result[level] || {};
            result[level] = group;
            group[path] = 0;
            if (!fileTreeConfig[path]) continue;
            let subTree = fileTreeConfig[path];
            Object.keys(subTree).map(function (key) {
                let child = subTree[key];
                let subGroup = result[level + 1] || {};
                result[level + 1] = subGroup;
                subGroup[child.fullpath] = 0;
                if (child.isDirectory) reading.push(child.fullpath);
            });
        }


        // 统计每层每个节点占的宽度
        totalLevel = Object.keys(result).length - 1;
        while (totalLevel > 0) {
            let currentFloor = result[totalLevel];
            let upFloor = result[totalLevel - 1];
            Object.keys(currentFloor).map(function (path) {
                currentFloor[path] = currentFloor[path] || 1;
                let father = path.split('/');
                father.pop();
                father = father.join('/');
                upFloor[father] += currentFloor[path];
            });
            totalLevel--;
        }


        // 换算成直角坐标
        totalLevel = Object.keys(result).length;
        result[0].src = {x: 0, z: 0, width: 45};
        for (let level = 1; level < totalLevel; level++) {
            let lastFloor = result[level - 1];
            let currentFloor = result[level];
            let currentFloorKeys = Object.keys(currentFloor);
            // 遍历上一层的目录，分配当前层位置
            Object.keys(lastFloor).map(function (path) {
                if (path.match(/.js$/)) return;
                // 获取上一层目录的位置信息
                let cutInfo = lastFloor[path];
                let top = 0;
                let bottom = 0;
                // 获取上一层叫path的目录在这一层的所有孩子，并按照孩子宽度升序排列
                let children = currentFloorKeys.filter(i => i.indexOf(path + '/') === 0);
                if (!children.length) return;
                children.sort((a, b) => currentFloor[a] - currentFloor[b]);
                // 遍历每个节点，分配合适的位置
                children.map(function (childPath, index) {
                    let width = currentFloor[childPath].width || currentFloor[childPath];
                    let halfWidth = width;
                    width *= 2;
                    if (index === 0) {
                        currentFloor[childPath] = {x: level, z: cutInfo.z, width: width};
                        top = cutInfo.z - halfWidth;
                        bottom = cutInfo.z + halfWidth;
                        return;
                    }
                    if (index % 2) { // 奇数向下
                        currentFloor[childPath] = {x: level, z: bottom + halfWidth, width: width};
                        bottom = bottom + width;
                    }
                    else { // 偶数向上
                        currentFloor[childPath] = {x: level, z: top - halfWidth, width: width};
                        top = top - width;
                    }
                });
            });
        }


        // 将文件锥打平，生成节点位置
        for (let level = 0; level < Object.keys(result).length; level++) {
            Object.assign(result, result[level]);
            delete result[level];
        }


        // 生成Vector3
        Object.keys(result).map(key => {
            result[key] = new THREE.Vector3(result[key].z * 200, 0, result[key].x * 600);
        });


        return result;


    };

});
