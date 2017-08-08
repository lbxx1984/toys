define(function (require) {


    const React = require('react');
    const _ = require('underscore');

    return React.createClass({
        getDefaultProps() {
            return {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                base: 0, // 0刻度所在的像素
                step: 5, // 每个刻度的间隔
                type: 'horizontal', // vertical 垂直；horizontal 水平
                fixedPosition: true // 根据父亲容器的滚动条设置自己的位置
            }
        },
        componentWillReceiveProps(nextProps) {
            if (_.isEqual(nextProps, this.props)) return;
            this.drawRuler(nextProps);
        },
        componentDidMount() {
            let me = this;
            this.drawRuler(this.props);
            if (this.refs.canvas && this.refs.canvas.parentNode && this.props.fixedPosition) {
                this.refs.canvas.parentNode.addEventListener('scroll', this.syncPosition);
            }
        },
        componentWillUnmount() {
            if (this.refs.canvas && this.refs.canvas.parentNode && this.props.fixedPosition) {
                this.refs.canvas.parentNode.removeEventListener('scroll', this.syncPosition);
            }
        },
        syncPosition() {
            if (this.refs.canvas && this.refs.canvas.parentNode) {
                let left = this.refs.canvas.parentNode.scrollLeft;
                let top = this.refs.canvas.parentNode.scrollTop;
                if (this.props.type === 'horizontal') {
                    this.refs.canvas.style.left = this.props.left - left + 'px';
                }
                else {
                    this.refs.canvas.style.top = this.props.top - top + 'px';
                }
            }
        },
        drawRuler(props) {
            // 准备数据
            let rule = [{p: props.base, v: 0}];
            let i = props.base, v = 0, max = props.type === 'horizontal' ? props.width : props.height;
            while (i > 0) {
                i -= props.step; v -= props.step; i > 0 && rule.push({p: i,v: v});
            }
            i = props.base; v = 0;
            while (i < max) {
                i += props.step; v += props.step; i < max && rule.push({p: i, v: v});
            }
            // 开始绘制
            let canvas = this.refs.canvas;
            let ctx = canvas.getContext('2d');
            canvas.width = props.width;
            canvas.height = props.height;
            canvas.style.left = props.left + 'px';
            canvas.style.top = props.top + 'px';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, props.width, props.height);
            rule.map(function (item) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#C1C1C1';
                if (props.type === 'horizontal') {
                    ctx.moveTo(item.p - 0.5, props.height + 0.5);
                    ctx.lineTo(item.p - 0.5, 0.5 + props.height - (item.v % (props.step * 10) === 0 ? 10 : 5));
                }
                else {
                    ctx.moveTo(props.width - 0.5, item.p - 0.5);
                    ctx.lineTo(props.width - 0.5 - (item.v % (props.step * 10) === 0 ? 10 : 5), item.p - 0.5);
                }
                ctx.stroke();
                if (item.v % (props.step * 10) === 0) {
                    ctx.fillStyle = '#000000';
                    let label = Math.abs(item.v) >= 1000 ? (parseFloat(item.v / 1000).toFixed(1) + 'k') : (item.v + '');
                    if (props.type === 'horizontal') {
                        ctx.fillText(
                            label,
                            item.p - label.length * 8 * 0.5,
                            props.height - 15
                        );
                    }
                    else {
                        ctx.fillText(
                            label,
                            props.width - label.length * 8 - (item.v < 0 || item.v >= 1000 ? 5 : 10),
                            item.p + 5
                        );
                    }
                }
            });
        },
        render() {
            return (<canvas ref="canvas"/>);
        }
    });


});