/**
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const THREE = require('three');
    const FLOOR_DISTANCE = 800;


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


        // 换算成极坐标
        totalLevel = Object.keys(result).length;
        // 分配原始扇区
        result[0].src = {
            begin: 0,   // begin，其实角度
            a: 8,       // a，节点所在角度，r = 0 时 a并没有什么意义
            end: 360,   // end，结束角度
            r: 0        // r，半径
        };
        for (let level = 1; level < totalLevel; level++) {
            let lastFloor = result[level - 1];
            let currentFloor = result[level];
            let currentFloorKeys = Object.keys(currentFloor);
            // 遍历上一层的目录，分配当前层扇区
            Object.keys(lastFloor).map(function (path) {
                if (path.match(/.js$/)) return;
                // 获取上一层目录的扇区分派信息
                let cutInfo = lastFloor[path];
                // 获取上一层叫path的目录在这一层的所有孩子，并依据孩子宽度按照驼峰形式，将children排序
                let children = currentFloorKeys
                    .filter(i => i.indexOf(path + '/') === 0)
                    .sort((b, a) => currentFloor[a] - currentFloor[b]);
                let sortedChildren = [];
                let cut = 0;
                children.map(function (path, i) {
                    sortedChildren[i % 2 ? 'unshift' : 'push'](path);
                    cut += currentFloor[path];
                });
                // 分配子扇区，文件不分配扇区，文件夹从begin开始分配
                let begin = cutInfo.begin + 1;
                let end = cutInfo.end - 1;
                let r = cutInfo.r + FLOOR_DISTANCE;
                let d = (end - begin) / cut;
                sortedChildren.map(function (path) {
                    currentFloor[path] = {
                        begin: begin,
                        a: 0,
                        end: begin + currentFloor[path] * d,
                        r: r
                    };
                    currentFloor[path].a = currentFloor[path].begin + (currentFloor[path].end - currentFloor[path].begin) / 2;
                    begin = currentFloor[path].end;
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
            let {r,a} = result[key];
            result[key] = new THREE.Vector3(Math.cos(a * 0.0174) * r, 0, Math.sin(a * 0.0174) * r);
        });


        return result;

    };

});
