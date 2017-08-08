
define(function (require) {

    function getStructure(filename) {
        return {
            uuid: filename,
            type: 'div',
            skin: 'oneux3',
            children: [
                {
                    uuid: 'inputContainer',
                    type: 'div',
                    children: [
                        {
                            uuid: 'inputLabel',
                            type: 'span'
                        },
                        {
                            uuid: 'nameField',
                            type: 'TextBox',
                            module: 'fcui2/TextBox.jsx'
                        }
                    ]
                }
            ]
        };
    }


    function getDataset(filename) {
        var dataset = {
            nameField: {
                value: 'textbox',
                style: {
                    marginRight: '5px'
                }
            },
            inputLabel: {
                style: {
                    fontWeight: 700
                },
                dangerouslySetInnerHTML: {
                    __html: '请输入姓名：'
                }
            },
            inputContainer: {
                style: {
                    border: '1px dashed red',
                    minHeight: '10px',
                    padding: '10px'
                }
            }
        };
        dataset[filename] = {};
        return dataset;
    }


    return function (filename) {
        filename = filename || 'Untitled';
        var file = {
            filename: filename,
            width: 800,
            height: 600,
            fixedSize: false,
            structure: getStructure(filename),
            dataset: getDataset(filename),
            saved: false
        }
        return file;
    };

});
