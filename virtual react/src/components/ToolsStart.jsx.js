define(function (require) {


    const React = require('react');


    return React.createClass({
        contextTypes: {
            dispatch: React.PropTypes.func
        },
        onToolsBtnClick(e) {
            e.stopPropagation();
            this.context.dispatch('fill', {
                currentWidget: '',
                currentStageMode: e.target.dataset.cmd
            });
        },
        onOptBtnClick(e) {
            e.stopPropagation();
            this.context.dispatch('operation-' + e.target.dataset.cmd);
        },
        render() {
            let selectBtn = {
                title: '选择工具（alt + s）',
                'data-cmd': 'select',
                className: 'ico icon icon-select' + (this.props.currentStageMode === 'select' ? ' checked' : '')
            };
            let dragBtn = {
                title: '拖拽工具（alt + d）',
                'data-cmd': 'drag',
                className: 'ico icon icon-drag' + (this.props.currentStageMode === 'drag' ? ' checked' : '')
            };
            let delBtn = {
                title: '删除（Delete）',
                'data-cmd': 'delete',
                className: 'ico icon icon-delete' + (this.props.selectedWidget ? '' : ' disabled')
            };
            let cutBtn = {
                title: '剪切（ctrl + x）',
                'data-cmd': 'cut',
                className: 'ico icon icon-cut' + (this.props.selectedWidget ? '' : ' disabled')
            };
            let copyBtn = {
                title: '复制（ctrl + c）',
                'data-cmd': 'copy',
                className: 'ico icon icon-copy' + (this.props.selectedWidget ? '' : ' disabled')
            };
            let pasteBtn = {
                title: '粘贴（ctrl + v）',
                'data-cmd': 'paste',
                className: 'ico icon icon-paste' + (this.props.clipboard ? '' : ' disabled')
            };
            if (!this.props.file) {
                selectBtn.className += ' disabled';
                dragBtn.className += ' disabled';
                delBtn.className += ' disabled';
                cutBtn.className += ' disabled';
                copyBtn.className += ' disabled';
                pasteBtn.className += ' disabled';
            }
            return (
                <div>
                    <div className="panel" onClick={this.onOptBtnClick}>
                        <span className="title">操作</span>
                        <div {...pasteBtn}></div>
                        <div {...copyBtn}></div>
                        <div {...cutBtn}></div>
                        <div {...delBtn}></div>
                    </div>
                    <div className="panel" onClick={this.onToolsBtnClick}>
                        <span className="title">工具</span>
                        <div {...selectBtn}></div>
                        <div {...dragBtn}></div>
                    </div>
                </div>
            );
        }
    });


});