/**
 * @file 应用入口
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    const React = require('react');
    const Stage3D = require('./components/Stage3D.jsx');


    return React.createClass({
        childContextTypes: {
            dispatch: React.PropTypes.func
        },
        // @override
        getChildContext: function () {
            return {
                dispatch: this.props.dispatch
            };
        },
        onStageClick: function () {
            this.props.dispatch('onStageClick');
        },
        render: function () {
            return (
                <div className="tc-root-container">
                    {stageFactory(this)}
                </div>
            );
        }
    });


    function stageFactory(me) {
        const cameraConfig = me.props.stage.camera3D;
        const right = 300;
        const stage3dProps = {
            tool: me.props.tool,
            cameraRadius: cameraConfig.cameraRadius,
            cameraAngleA: cameraConfig.cameraAngleA,
            cameraAngleB: cameraConfig.cameraAngleB,
            cameraLookAt: cameraConfig.lookAt,
            gridVisible: me.props.stage.gridVisible,
            gridSize: me.props.stage.gridSize3D,
            gridStep: me.props.stage.gridStep3D,
            colorStage: me.props.stage.colorStage[1],
            colorGrid: me.props.stage.colorGrid[1]
        };
        return (
            <div onClick={me.onStageClick}>
                <Stage3D {...stage3dProps} style={{right: right}}/>
            </div>
        );
    }


});
