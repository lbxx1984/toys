define(function (require) {


    const React = require('react');
    const ToolsIndex = require('./components/ToolsIndex.jsx');
    const FileTags = require('./components/FileTags.jsx');
    const Stage = require('./components/Stage.jsx');
    const WidgetContainer = require('./components/WidgetContainer.jsx');
    const RightBar = require('./components/RightBar.jsx');


    return React.createClass({
        childContextTypes: {
            dispatch: React.PropTypes.func,
            appSkin: React.PropTypes.string
        },
        // @override
        getChildContext: function () {
            return {
                dispatch: this.props.dispatch,
                appSkin: 'oneux3'
            };
        },
        render() {
            let toolsIndexProps = {
                currentStageMode: this.props.currentStageMode,
                currentMenu: this.props.currentMenu,
                file: this.props.files[this.props.currentFile],
                showToolsContainer: this.props.showToolsContainer,
                selectedWidget: this.props.selectedWidget,
                clipboard: this.props.clipboard
            };
            let fileTags = {
                files: this.props.files,
                currentFile: this.props.currentFile,
                showToolsContainer: this.props.showToolsContainer,
                showLeftBar: this.props.showLeftBar,
                showRightBar: this.props.showRightBar
            };
            let stageProps = {
                selectedWidget: this.props.selectedWidget,
                customModulesHash: this.props.customModulesHash,
                file: this.props.files[this.props.currentFile],
                currentStageMode: this.props.currentStageMode,
                showToolsContainer: this.props.showToolsContainer,
                showLeftBar: this.props.showLeftBar,
                showRightBar: this.props.showRightBar
            };
            let widgetContainerProps = {
                customModules: this.props.customModules,
                currentWidget: this.props.currentWidget,
                currentWidgetType: this.props.currentWidgetType,
                showToolsContainer: this.props.showToolsContainer,
                showLeftBar: this.props.showLeftBar
            };
            let rightBarProps = {
                currentEditorType: this.props.currentEditorType,
                selectedWidget: this.props.selectedWidget,
                file: this.props.files[this.props.currentFile],
                showToolsContainer: this.props.showToolsContainer,
                showRightBar: this.props.showRightBar
            };
            return (
                <div>
                    <ToolsIndex {...toolsIndexProps}/>
                    <FileTags {...fileTags}/>
                    <Stage {...stageProps}/>
                    <WidgetContainer {...widgetContainerProps}/>
                    <RightBar {...rightBarProps}/>
                </div>
            );
        }
    });


});
