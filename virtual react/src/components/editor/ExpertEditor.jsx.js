define(function (require) {


    const React = require('react');
    const TextArea = require('fcui2/TextArea.jsx');
    const Button = require('fcui2/Button.jsx');


    function hotkeyAnalyzer(e) {
        if (e.ctrlKey && e.keyCode === 13) return 'ctrl + enter';
    }

    return React.createClass({
        contextTypes: {
            dispatch: React.PropTypes.func
        },
        componentWillReceiveProps(nextProps) {
            this.setState({
                dataset: JSON.stringify(nextProps.dataset, null, 4),
                isValid: true
            });
        },
        getInitialState() {
            return {
                dataset: JSON.stringify(this.props.dataset, null, 4),
                isValid: true
            };
        },
        onTextAreaChange(e) {
            let value = e.target.value;
            let isValid = true;
            try {
                let func = new Function('return' + value);
                func();
            }
            catch (e) {
                isValid = false;
            }
            this.setState({
                dataset: e.target.value,
                isValid: isValid
            });
        },
        onResetClick() {
            this.setState({dataset: JSON.stringify(this.props.dataset, null, 4)});
        },
        onEnterClick() {
            let value = this.state.dataset;
            try {
                let func = new Function('return' + value);
                let dataset = func();
                this.context.dispatch('file-update-dataset', dataset);
            }
            catch (e) {
                this.setState({isValid: false});
            }
        },
        render() {
            let textAreaProps = {
                width: 268,
                value: this.state.dataset,
                onChange: this.onTextAreaChange,
                hotkeyAnalyzer: hotkeyAnalyzer,
                onHotKey: this.onEnterClick,
                inputBoxStyle: {
                    whiteSpace: 'nowrap',
                    overflow: 'scroll'
                }
            };
            let enterBtnProps = {
                label: '确定',
                skin: 'blue',
                disabled: !this.state.isValid,
                onClick: this.onEnterClick,
                title: 'ctrl + enter',
                style: {
                    marginTop: 5
                }
            };
            let resetBtnProps = {
                label: '重置',
                onClick: this.onResetClick,
                style: {
                    marginTop: 5,
                    marginLeft: 10
                }
            };
            return (
                <div style={{padding: '5px 10px'}}>
                    <TextArea {...textAreaProps}/>
                    <Button {...enterBtnProps}/>
                    <Button {...resetBtnProps}/>
                </div>
            );
        }
    });

});