define(function (require) {


    const React = require('react');
    const Tree = require('fcui2/Tree.jsx');
    const TreeRenderer = require('./renderer/StructureTreeLeafRenderer.jsx');


    return React.createClass({
        contextTypes: {
            dispatch: React.PropTypes.func
        },
        getInitialState() {
            return {};
        },
        onTreeAction(type, e) {
            if (e.item.value) {
                this.context.dispatch('set', 'selectedWidget', e.item.value);
            }
        },
        render() {
            let file = this.props.file;
            if (!file) return;
            let treeProps = {
                datasource: getTreeDatasource(file.structure, this.props.selectedWidget),
                leafRenderer: TreeRenderer,
                onAction: this.onTreeAction
            };
            return (
                <div style={{padding: 10}}>
                    <span style={{fontSize: 12, fontWeight: 700}}>页面结构</span>
                    <Tree {...treeProps}/>
                </div>
            );
        }
    });


    function getTreeDatasource(structure, selectedWidget) {
        let result = structure.children.map(getItem);
        function getItem(item) {
            let obj = {};
            obj.value = item.uuid;
            obj.selected = item.uuid === selectedWidget;
            obj.label = item.uuid + '(' + item.type + ')';
            if (item.children instanceof Array && item.children.length) {
                obj.children = item.children.map(getItem);
            }
            return obj;
        }
        return result;
    }


});