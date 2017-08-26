/**
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const THREE = require('three');
    const FLOOR_DISTANCE = 1000;


    return function (dataset) {


        const fileTreeConfig = dataset.fileTreeConfig;
        let result = {
            src: new THREE.Vector3(0, 1000, 0)
        };
        let reading = ['src'];


        while (reading.length) {
            let path = reading.shift();
            let children = fileTreeConfig[path];

            console.log(children);
        }


        return result;

    };

});
