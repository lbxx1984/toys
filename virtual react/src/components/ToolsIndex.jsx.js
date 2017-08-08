define(function (require) {


    const React = require('react');
    const Layer = require('fcui2/Layer.jsx');


    const config = require('../config');
    const toolsHash = {
        start: require('./ToolsStart.jsx'),
        file: require('./ToolsFile.jsx')
    };


    return React.createClass({
        contextTypes: {
            dispatch: React.PropTypes.func
        },
        getInitialState() {
            return {
                currentMenu: '',
                showToolsContainer: false,
                layerAnchor: null
            }
        },
        componentDidMount() {
            this.setState({layerAnchor: this.refs.layerAnchor});
        },
        onMenuItemClick: function (e) {
            this.context.dispatch('set', 'currentMenu', e.target.dataset.cmd);
        },
        onMenuItemHover(e) {
            clearTimeout(this.timer);
            this.setState({
                currentMenu: e.target.dataset.cmd,
                showToolsContainer: true
            });
        },
        onMenuItemLeave(e) {
            this.closeLayer();
        },
        onLayerMouseEnter(e) {
            clearTimeout(this.timer);
        },
        onLayerMouseLeave(e) {
            this.closeLayer();
        },
        closeLayer() {
            let me = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                me.setState({
                    showToolsContainer: false,
                    currentMenu: ''
                });
            }, 500);
        },
        render() {
            let Tools = toolsHash[this.state.currentMenu || this.props.currentMenu];
            let layerProps = {
                className: 'tools-container-layer',
                isOpen: this.state.showToolsContainer || this.props.showToolsContainer,
                anchor: this.state.layerAnchor,
                onMouseLeave: this.props.showToolsContainer ? undefined : this.onLayerMouseLeave,
                onMouseEnter: this.props.showToolsContainer ? undefined : this.onLayerMouseEnter,
                location: 6,
                onOffset: function (e) {
                    e.top += 2;
                }
            };
            let toolsContainerProps = {
                className: 'tool-container',
                style: {
                    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 13
                }
            };
            return (
                <div className="tools-navigator">
                    <div className="logo" ref="layerAnchor">Visual React</div>
                    {menuItemFactory(this)}
                    <Layer {...layerProps}>
                        <div {...toolsContainerProps}>{Tools ? <Tools {...this.props}/> : null}</div>
                    </Layer>
                </div>
            );
        }

    });


    function menuItemFactory(me) {
        return config.menu.map(function (item, index) {
            let itemProps = {
                key: 'menu-item-' + index,
                'data-cmd': item.value,
                onMouseEnter: me.props.showToolsContainer ? undefined : me.onMenuItemHover,
                onMouseLeave: me.props.showToolsContainer ? undefined : me.onMenuItemLeave,
                onClick: me.props.showToolsContainer ? me.onMenuItemClick : undefined,
                title: item.title,
                className: 'menu-item'
                    + (me.props.showToolsContainer && item.value === me.props.currentMenu ? ' menu-item-active' : '')
                    + (!me.props.showToolsContainer && item.value === me.state.currentMenu ? ' menu-item-hover' : '')
            };
            return (<div {...itemProps}>{item.label}</div>);
        });
    }


});