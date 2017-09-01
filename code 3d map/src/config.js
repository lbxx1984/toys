/**
 * @file editor工作需要的基础数据结构
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    return {
        arrestedHotKey: [],
        // 系统稳定态时间戳
        timer: 0,
        // 舞台配置信息
        stage: {
            // 舞台背景色
            colorStage: ['#3D3D3D', 0x3d3d3d],
            // 舞台坐标纸颜色
            colorGrid: ['#8F908A', 0x8F908A],
            // 3D摄像机配置
            camera3D: {
                // 摄像机到期观察点的距离，可以理解为焦距
                cameraRadius: 4000,
                // 摄像机视线与XOZ平面夹角
                cameraAngleA: 40,
                // 摄像机视线在XOZ平面投影与X轴夹角
                cameraAngleB: 45,
                // 摄像机观察点
                lookAt: {x: 0, y: 0, z: 0}
            },
            // 舞台中网格是否显示
            gridVisible: true,
            // 舞台中3D网格大小
            gridSize3D: 20000,
            // 舞台中3D网格单元格大小
            gridStep3D: 50
        },
        // 当前鼠标的3D位置
        mouse3d: {x: 0, y: 0, z: 0},
        // 编辑器当前处于响应拖拽事件的命令
        tool: 'camera-move'
    };


});
