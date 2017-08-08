define(function (require) {


    const React = require('react');
    const Tab = require('fcui2/Tab.jsx');
    const ExpertEditor = require('./editor/ExpertEditor.jsx');
    const StructureTree = require('./StructureTree.jsx');
    const config = require('../config');


    return React.createClass({
        contextTypes: {
            dispatch: React.PropTypes.func
        },
        getInitialState() {
            return {
                containerRight: 5 - config.RIGHT_BAR_WIDTH
            };
        },
        onMouseEnter() {
            clearTimeout(this.timer);
            this.setState({containerRight: 0});
        },
        onMouseLeave() {
            clearTimeout(this.timer);
            let me = this;
            setTimeout(function () {
                me.setState({containerRight: 5 - config.RIGHT_BAR_WIDTH});
            }, 500);
        },
        onEditorTypeChange(e) {
            this.context.dispatch('set', 'currentEditorType', e.target.value);
        },
        render() {
            let containerProps = {
                className: 'side-bar-container',
                style: {
                    right: this.props.showRightBar ? 0 : this.state.containerRight, 
                    width: config.RIGHT_BAR_WIDTH,
                    bottom: 0,
                    top: this.props.showToolsContainer ? 132 : 37
                },
                onMouseEnter: this.props.showRightBar ? undefined : this.onMouseEnter,
                onMouseLeave: this.props.showRightBar ? undefined : this.onMouseLeave
            };
            let editorTypeProps = {
                skin: 'level-3',
                datasource: config.editorType,
                value: this.props.currentEditorType,
                onChange: this.onEditorTypeChange
            };
            let treeProps = {
                file: this.props.file,
                selectedWidget: this.props.selectedWidget
            };
            return (
                <div {...containerProps}>
                    <div className="inner-container">
                        <Tab {...editorTypeProps}/>
                        {propertyEditorFactory(this)}
                        {this.props.file ? <StructureTree {...treeProps}/> : null}
                    </div>
                </div>
            );
        }
    });


    function propertyEditorFactory(me) {
        let file = me.props.file;
        let widget = me.props.selectedWidget;
        let dataset = file && file.dataset[widget] ? file.dataset[widget] : {};
        if (me.props.currentEditorType === 'expert') {
            return <ExpertEditor dataset={dataset}/>;
        }
        return;
    }


});