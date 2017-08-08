define(function (require) {


    const React = require('react');


    return React.createClass({
        contextTypes: {
            dispatch: React.PropTypes.func
        },
        onExportBtnClick(e) {
            if (e.target.dataset.cmd === 'export') {
                this.context.dispatch('file-export');
            }
            else {
                this.context.dispatch('file-download');
            }
        },
        onNewModuleBtnClick(e) {
            e.stopPropagation();
            this.context.dispatch('file-new', e.target.dataset.cmd);
        },
        render() {
            let exportBtnClassName = 'ico icon icon-export' + (this.props.file ? '' : ' disabled');
            let downloadBtnClassName = 'ico icon icon-download' + (this.props.file ? '' : ' disabled');
            return (
                <div>
                    <div className="panel" onClick={this.onNewModuleBtnClick}>
                        <span className="title">新建</span>
                        <div data-cmd="panel" className="ico icon icon-panel" title="普通模块"></div>
                        <div data-cmd="titleWindow" className="ico icon icon-title-window" title="弹窗模块"></div>
                        <div data-cmd="shojiScreen" className="ico icon icon-shoji-screen" title="侧拉门模块"></div>
                    </div>
                    <div className="panel" onClick={this.onExportBtnClick}>
                        <span className="title">导出</span>
                        <div data-cmd="export" className={exportBtnClassName} title="导出代码"></div>
                        <div data-cmd="download" className={downloadBtnClassName} title="下载代码"></div>
                    </div>
                </div>
            );
        }
    });


});