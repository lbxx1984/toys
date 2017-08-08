define(function (require) {


    const React = require('react');
    const List = require('fcui2/List.jsx');
    const SelectableRenderer = require('fcui2/components/list/SelectableRenderer.jsx');
    const Tip = require('fcui2/Tip.jsx');


    const config = require('../config');


    return React.createClass({
        contextTypes: {
            dispatch: React.PropTypes.func
        },
        getInitialState() {
            return {
                containerLeft: 5 - config.LEFT_BAR_WIDTH
            };
        },
        onMouseEnter() {
            clearTimeout(this.timer);
            this.setState({containerLeft: 0});
        },
        onMouseLeave() {
            clearTimeout(this.timer);
            let me = this;
            setTimeout(function () {
                me.setState({containerLeft: 5 - config.LEFT_BAR_WIDTH});
            }, 500);
        },
        onWidgetTypeChange(e) {
            this.context.dispatch('set', 'currentWidgetType', e.target.value);
        },
        onWidgetClick(e) {
            this.context.dispatch('fill', {
                currentWidget: e.target.dataset.uiCmd,
                currentStageMode: 'click'
            });
            e.stopPropagation();
        },
        render() {
            let containerProps = {
                className: 'side-bar-container widget-container',
                style: {
                    left: this.props.showLeftBar ? 0 : this.state.containerLeft, 
                    width: config.LEFT_BAR_WIDTH,
                    bottom: 0,
                    top: this.props.showToolsContainer ? 132 : 37
                },
                onMouseEnter: this.props.showLeftBar ? undefined : this.onMouseEnter,
                onMouseLeave: this.props.showLeftBar ? undefined : this.onMouseLeave
            };
            return (
                <div {...containerProps}>
                    <div className="inner-container">
                        {widgetsTypeFactory(this)}
                        {widgetsFactory(this)}
                    </div>
                </div>
            );
        }
    });


    function widgetsTypeFactory(me) {
        let datasource = JSON.parse(JSON.stringify(config.componentsType));
        datasource.map(function (item) {
            item.isSelected = item.value === me.props.currentWidgetType;
        });
        let listProps = {
            datasource: datasource,
            itemRenderer: SelectableRenderer,
            onClick: me.onWidgetTypeChange
        };
        return <List {...listProps}/>;
    }


    function widgetsFactory(me) {
        var arr = config.widgets[me.props.currentWidgetType] || me.props.customModules
        return arr.map(function (item) {
            // 内部组件
            if (item.label && item.value) {
                let tipProps = !item.tip ? {} : {
                    title: item.label,
                    content: [
                        '<div style="',
                        'width:' + item.tip.width + 'px;',
                        'height:' + item.tip.height + 'px;',
                        'background-image:url(' + item.tip.image + ');',
                        'background-size: 100% 100%',
                        '">'
                    ].join('')
                };
                let containerProps = {
                    key: item.value,
                    className: 'widget-item' + (item.value === me.props.currentWidget ? ' selected' : ''),
                    'data-ui-cmd': item.value,
                    onClick: me.onWidgetClick
                };
                return (
                    <div {...containerProps}>
                        <span data-ui-cmd={item.value} onClick={me.onWidgetClick}>{item.label}</span>
                        <Tip {...tipProps}/>
                    </div>
                );
            }
            // 自定义模块
            let btnProps = {
                className: 'widget-item' + (item.moduleName === me.props.currentWidget ? ' selected' : ''),
                'data-ui-cmd': item.moduleName,
                key: item.moduleName,
                onClick: me.onWidgetClick
            };
            return (
                <div {...btnProps}>
                    <span data-ui-cmd={item.moduleName} onClick={me.onWidgetClick}>{item.label}</span>
                </div>
            );
        });
    }


});