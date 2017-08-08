
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
                            uuid: 'button',
                            type: 'Button',
                            module: 'fcui2/Button.jsx'
                        }
                    ]
                }
            ]
        };
    }


    function getDataset(filename) {
        var dataset = {
            button: {
                label: 'Tip Button',
                skin: 'blue'
            },
            inputContainer: {
                style: {
                    display: 'inline-block',
                    border: '1px dashed red',
                    width: 100,
                    height: 100
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
