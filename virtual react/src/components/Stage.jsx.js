define(function (require) {


    const _ = require('underscore');
    const React = require('react');
    const Ruler = require('./Ruler.jsx');

    const config = require('../config');
    const template = require('../dataset/stageTemplate');
    const compiler = require('../core/compiler');


    return React.createClass({
        contextTypes: {
            dispatch: React.PropTypes.func
        },
        getDefaultProps() {
            return {
                stageMargin: 50
            };
        },
        componentDidMount() {
            window.stageCallBack = this.onStageCallback;
            this.renderFile(this.props.file);
        },
        componentWillReceiveProps(nextProps) {
            if (!nextProps.file) {
                this.refs.container.innerHTML = '';
                return;
            }
            if (!this.props.file) {
                this.renderFile(nextProps.file);
                return;
            }
            if (!_.isEqual(nextProps.file.structure, this.props.file.structure)) {
                this.renderFile(nextProps.file);
                return;
            }
            if (nextProps.currentStageMode !== this.props.currentStageMode && this.contentWindow) {
                this.contentWindow.sdk.mode = nextProps.currentStageMode;
            }
            if (!_.isEqual(nextProps.file.dataset, this.props.file.dataset)) {
                this.renderDataset(nextProps.file);
            }
            if (nextProps.selectedWidget !== this.props.selectedWidget) {
                this.setSelected(nextProps.selectedWidget);
            }
        },
        onStageCallback(type) {
            if (type === 'rendered' && this.refs.container.childNodes.length > 1) {
                this.refs.container.removeChild(this.refs.container.childNodes[0]);
            }
            if (type === 'rendered') {
                let width = arguments[1];
                let height = arguments[2];
                if (width > this.props.file.width || height > this.props.file.height) {
                    !this.props.file.fixedSize && this.context.dispatch('stage-update-size', width, height);
                }
                this.contentWindow.sdk.setSelected(this.props.selectedWidget);
            }
            this.context.dispatch.apply(null, arguments);
        },
        renderFile(file) {
            if (!file) return;
            let code = compiler(file.structure, true);
            let data = file.dataset;
            this.propsDeps = findDepsFromProps(data);
            let html = template
                .replace('/* props deps */', this.propsDeps)
                .replace('/* code */', code)
                .replace('/* mode */', this.props.currentStageMode)
                .replace('/* dataset */', JSON.stringify(data, null, 4))
                .replace('/* appName */', file.filename);
            html = mergeDeps(html, this.props.customModulesHash);
            // console.log(html);
            let container = this.refs.container;
            let iframe = document.createElement('iframe');
            container.appendChild(iframe);
            this.contentDocument = iframe.contentDocument || iframe.document;
            this.contentWindow = iframe.contentWindow || iframe.window;
            this.contentDocument.write(html);
            this.setSelected(this.props.selectedWidget);
        },
        renderDataset(file) {
            let dataset = JSON.parse(JSON.stringify(file.dataset));
            let propsDeps = findDepsFromProps(dataset);
            if (this.propsDeps === propsDeps) {
                this.contentWindow.setAppProps(dataset);
            }
            else {
                this.renderFile(file);
            }
        },
        setSelected(uuid) {
            if (this.contentWindow && this.contentWindow.sdk) {
                this.contentWindow.sdk.setSelected(uuid);
            }
        },
        render() {
            let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            let file = this.props.file;
            let left = this.props.showLeftBar ? config.LEFT_BAR_WIDTH : 5;
            let right = this.props.showRightBar ? config.RIGHT_BAR_WIDTH : 5;
            let top = this.props.showToolsContainer ? 162 : 65;
            let containerProps = {
                className: 'stage-container',
                style: {
                    left: left,
                    right: right,
                    top: top
                }
            };
            let stageProps = {
                ref: 'container',
                className: 'stage',
                style: {
                    left: file
                        ? Math.max(this.props.stageMargin, 0.5 * (width - left - right - file.width))
                        : this.props.stageMargin,
                    top: this.props.stageMargin,
                    width: file ? file.width : 0,
                    height: file ? file.height : 0
                }
             };
            let topMaskStyle = {
                width: width - left - right,
                height: this.props.stageMargin
            };
            let leftMaskStyle = {
                width: this.props.stageMargin,
                height: file
                    ? Math.max(height - top - this.props.stageMargin, file.height + this.props.stageMargin)
                    : height - top - this.props.stageMargin
            };
            let horizontalRulerProps = {
                left: left,
                top: top,
                width: topMaskStyle.width + this.props.stageMargin,
                height: 35,
                base: stageProps.style.left
            };
            let verticalRulerProps = {
                left: left,
                top: top,
                width: 40,
                height: leftMaskStyle.height + this.props.stageMargin,
                base: this.props.stageMargin,
                type: 'vertical'
            };
            let rulerMaskProps = {
                className: 'font-icon font-icon-th-small ruler-mask',
                style: {
                    left: left + 1,
                    top: top
                }
            };
            return (
                <div {...containerProps}>
                    <div style={topMaskStyle}></div>
                    <div style={leftMaskStyle}></div>
                    <div {...stageProps}></div>
                    {file ? <Ruler {...horizontalRulerProps}/> : null}
                    {file ? <Ruler {...verticalRulerProps}/> : null}
                    {file ? <div {...rulerMaskProps}></div> : null}
                </div>
            );
        }
    });


    function mergeDeps(html, hash) {
        var pre = '/* import dep: ';
        var nxt = '*/';
        while (html.indexOf(pre) > -1) {
            var p = html.indexOf(pre);
            var q = html.indexOf(nxt, p);
            var str = html.substr(p, q - p + 2);
            var type = html.substr(p + pre.length, q - p - pre.length);
            var code = hash[type] ? hash[type].code : '';
            html = html.replace(str, code);
        }
        return html;
    }


    function findDepsFromProps(data) {
        let result = [];
        let code = JSON.stringify(data, null, 4).split('\n');
        code.map(function (line) {
            if (line.indexOf('require(') > -1) {
                let p = line.indexOf('require(') + 9;
                let q = line.indexOf(')', p);
                let moduleName = line.substr(p, q - p - 1);
                if (moduleName.indexOf('fcui2/') < 0) {
                    let dep = '/* import dep: ' + moduleName + '*/';
                    if (result.indexOf(dep) < 0) {
                        result.push('/* import dep: ' + moduleName + '*/');
                    }
                }
            }
        });
        return result.join('\n');
    }


});