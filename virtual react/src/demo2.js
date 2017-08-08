
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
                            uuid: 'label1',
                            type: 'span'
                        },
                        {
                            uuid: 'br1',
                            type: 'br'
                        },
                        {
                            uuid: 'textField1',
                            type: 'TextField',
                            module: 'TextField'
                        },
                        {
                            uuid: 'textField2',
                            type: 'TextField',
                            module: 'TextField'
                        },
                        {
                            uuid: 'tip',
                            type: 'Tip',
                            module: 'fcui2/Tip.jsx'
                        }
                    ]
                }
            ]
        };
    }


    function getDataset(filename) {
        var dataset = {
            label1: {
                style: {
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#546383'
                },
                dangerouslySetInnerHTML: {
                    __html: 'It is a demo with sub components.'
                }
            },
            tip: {
                renderer: 'require(\'TipRenderer\')',
                content: 'just test tip',
                renderProps: {
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
                }
            },
            textField1: {
                nameField: {
                    value: 'Brian Li',
                    style: {
                        marginRight: '5px',
                        color: '#4500FF'
                    }
                },
                inputLabel: {
                    style: {
                        fontWeight: 700,
                        backgroundColor: '#987856'
                    },
                    dangerouslySetInnerHTML: {
                        __html: 'Your Name: '
                    }
                },
                inputContainer: {
                    style: {
                        border: '1px dashed red',
                        minHeight: '10px',
                        padding: '10px'
                    }
                }
            },
            textField2: {
                nameField: {
                    value: 'Baidu.com',
                    style: {
                        marginRight: '5px'
                    }
                },
                inputLabel: {
                    style: {
                        fontWeight: 700
                    },
                    dangerouslySetInnerHTML: {
                        __html: 'Your Company: '
                    }
                },
                inputContainer: {
                    style: {
                        border: '1px dashed green',
                        minHeight: '10px',
                        padding: '10px'
                    }
                }
            }
        };
        dataset[filename] = {
            style: {
                backgroundColor: '#E2E2E2',
                border: '1px solid #272822'
            }
        };
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
