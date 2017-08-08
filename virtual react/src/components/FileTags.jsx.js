define(function (require) {


    const React = require('react');
    const config = require('../config');


    return React.createClass({
        contextTypes: {
            dispatch: React.PropTypes.func
        },
        onCurrentFileChange(e) {
            this.context.dispatch('fill', {
                currentFile: +e.target.dataset.index,
                selectedWidget: ''
            });
        },
        onFileDelete(e) {
            this.context.dispatch('file-delete', +e.target.dataset.index);
            e.stopPropagation();
        },
        render() {
            let containerProps = {
                className: 'file-tags-container',
                style: {
                    left: this.props.showLeftBar ? config.LEFT_BAR_WIDTH : 5,
                    right: 5,
                    top: this.props.showToolsContainer ? 127 : 32
                }
            };
            return (<div {...containerProps}>{fileTagFactory(this)}</div>);
        }
    });


    function fileTagFactory(me) {
        return me.props.files.map(function (item, index) {
            let tagProps = {
                key: 'file-tag-' + index,
                className: 'file-tag' + (index === me.props.currentFile ? '-current' : ''),
                'data-index': index,
                onClick: me.onCurrentFileChange
            };
            let iconProps = {
                className: 'font-icon font-icon-times',
                'data-index': index,
                onClick: me.onFileDelete
            };
            return (
                <div {...tagProps}>
                    {item.filename + (item.saved ? '' : ' *')}
                    <span {...iconProps}></span>
                </div>
            );
        });
    }


});