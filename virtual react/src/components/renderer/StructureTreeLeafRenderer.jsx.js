
define(function (require) {


    var React = require('react');
    var TreeNodeBase = require('fcui2/mixins/TreeNodeBase');


    return React.createClass({
        mixins: [TreeNodeBase],
        getDefaultProps: function () {
            return {
                index: '',
                item: {},
                value: {},
                treeComponent: {},
                selected: false, // 是否选中
                onAction: function () {}
            };
        },
        // @override
        getInitialState: function () {
            return {};
        },
        onClick: function (e) {
            typeof this.props.onAction === 'function' && this.props.onAction('TreeLeafClick', {
                item: this.props.item,
                index: this.props.index.split(',')
            });
        },
        render: function () {
            var item = this.props.item;
            var expand = this.props.value.expand || {};
            var containerProp = {
                ref: 'container',
                className: 'list-normal-item' + (item.selected ? ' list-normal-item-selected' : ''),
                onClick: this.onClick,
                style: {paddingLeft: (this.props.index.split(',').length - 1) * 12}
            };
            var iconProp = {
                className: 'expand-button font-icon font-icon-caret-' + (expand[item.value] ? 'down' : 'right'),
                style: {visibility: !(item.children instanceof Array) ? 'hidden' : 'visible'},
                onClick: this.onExpand
            };
            return (
                <div {...containerProp}>
                    <div {...iconProp}></div>
                    <span>{item.label}</span>
                </div>
            );
        }
    });

});
