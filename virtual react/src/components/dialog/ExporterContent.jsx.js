define(function (require) {


    const React = require('react');
    const TextArea = require('fcui2/TextArea.jsx');


    return React.createClass({
        render() {
            let files = this.props.files instanceof Array ? this.props.files : [];
            return (
                <div style={{padding: '0 20px 20px'}}>
                    {files.map(codeContent)}
                </div>
            );
        }
    });


    function codeContent(file) {
        var height = (file.code.split('\n').length + 1.5) * 20;
        return (
            <div key={file.foldername + file.filename}>
                <h4>{'./' + (file.foldername ? file.foldername + '/' : '') + file.filename}</h4>
                <TextArea value={file.code} width={1000} height={height}/>
            </div>
        );
    }


});