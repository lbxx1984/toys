
define(function (require) {

    return {
        // fcui2组件
        'fcui2/Button.jsx': {
            template: {
                type: 'Button',
                module: 'fcui2/Button.jsx'
            },
            dataset: {
                label: '按钮'
            }
        },
        'fcui2/Tip.jsx': {
            template: {
                type: 'Tip',
                module: 'fcui2/Tip.jsx'
            },
            dataset: {
                title: '提示',
                content: '提示的内容'
            }
        },
        'fcui2/List.jsx': {
            template: {
                type: 'List',
                module: 'fcui2/List.jsx'
            },
            dataset: {
                datasource: [
                    {label: '第一行', value: 1},
                    {label: '第二行', value: 2},
                    {label: '第三行', value: 3},
                    {label: '第四行', value: 4},
                    {label: '第五行', value: 5}
                ]
            }
        },
        'fcui2/DropDownList.jsx': {
            template: {
                type: 'DropDownList',
                module: 'fcui2/DropDownList.jsx'
            },
            dataset: {
                label: 'DropDownList',
                datasource: [
                    {label: '第一行', value: 1},
                    {label: '第二行', value: 2},
                    {label: '第三行', value: 3},
                    {label: '第四行', value: 4},
                    {label: '第五行', value: 5}
                ]
            }
        },
        'fcui2/TextBox.jsx': {
            template: {
                type: 'TextBox',
                module: 'fcui2/TextBox.jsx'
            },
            dataset: {
                value: '',
                placeholder: '请输入内容'
            }
        },
        // 布局组件
        'container-base': {
            replaceUUID: true,
            template: {
                uuid: 'div1',
                type: 'div',
                children: []
            },
            dataset: {
                div1: {
                    style: {
                        minHeight: '28px',
                        border: '1px dashed #D4D4D4'
                    }
                }
            }
        },
        'container-two-columns-left': {
            replaceUUID: true,
            template: {
                uuid: 'div1',
                type: 'div',
                children: [
                    {
                        uuid: 'div2',
                        type: 'div'
                    },
                    {
                        uuid: 'div3',
                        type: 'div'
                    }
                ]
            },
            dataset: {
                div1: {
                    style: {
                        minHeight: '28px'
                    }
                },
                div2: {
                    style: {
                        float: 'left',
                        width: '300px',
                        minHeight: '28px',
                        border: '1px dashed #D4D4D4'
                    }
                },
                div3: {
                    style: {
                        marginLeft: '300px',
                        minHeight: '28px',
                        border: '1px dashed #D4D4D4',
                        borderLeft: ''
                    }
                }
            }
        },
        'container-two-columns-right': {
            replaceUUID: true,
            template: {
                uuid: 'div1',
                type: 'div',
                children: [
                    {
                        uuid: 'div2',
                        type: 'div'
                    },
                    {
                        uuid: 'div3',
                        type: 'div'
                    }
                ]
            },
            dataset: {
                div1: {
                    style: {
                        minHeight: '28px'
                    }
                },
                div2: {
                    style: {
                        float: 'right',
                        width: '300px',
                        minHeight: '28px',
                        border: '1px dashed #D4D4D4'
                    }
                },
                div3: {
                    style: {
                        marginRight: '300px',
                        minHeight: '28px',
                        border: '1px dashed #D4D4D4',
                        borderRight: ''
                    }
                }
            }
        },
        'container-three-columns': {
            replaceUUID: true,
            template: {
                uuid: 'div1',
                type: 'div',
                children: [
                    {
                        uuid: 'div2',
                        type: 'div'
                    },
                    {
                        uuid: 'div3',
                        type: 'div'
                    },
                    {
                        uuid: 'div4',
                        type: 'div'
                    }
                ]
            },
            dataset: {
                div1: {
                    style: {
                        minHeight: '28px'
                    }
                },
                div2: {
                    style: {
                        float: 'right',
                        width: '200px',
                        minHeight: '28px',
                        border: '1px dashed #D4D4D4'
                    }
                },
                div3: {
                    style: {
                        float: 'left',
                        width: '200px',
                        minHeight: '28px',
                        border: '1px dashed #D4D4D4'
                    }
                },
                div4: {
                    style: {
                        margin: '0 200px',
                        minHeight: '28px',
                        border: '1px dashed #D4D4D4',
                        borderRight: '',
                        borderLeft: ''
                    }
                }
            }
        },
        // 原生DOM
        'dom-span': {
            template: {
                type: 'span'
            },
            dataset: {
                dangerouslySetInnerHTML: {
                    __html: '普通文本'
                },
                style: {
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#000',
                    lineHeight: '28px'
                }
            }
        },
        'dom-a': {
            template: {
                type: 'a'
            },
            dataset: {
                dangerouslySetInnerHTML: {
                    __html: '超级链接'
                },
                target: '_blank',
                href: 'http://www.baidu.com',
                style: {
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '28px',
                }
            }
        },
        'dom-icon': {
            template: {
                type: 'span'
            },
            dataset: {
                className: 'font-icon font-icon-earth'
            }
        },
        'dom-br': {
            template: {
                type: 'br'
            },
            dataset: {}
        },
        'dom-hr': {
            template: {
                type: 'hr'
            },
            dataset: {}
        },
        'dom-p': {
            template: {
                type: 'p'
            },
            dataset: {
                dangerouslySetInnerHTML: {
                    __html: '段落文字'
                },
                style: {
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#000'
                }
            }
        },
        'dom-img': {
            template: {
                type: 'img'
            },
            dataset: {
                src: 'https://www.baidu.com/img/bd_logo1.png',
                width: '270px',
                height: '129px'
            }
        }
    };

});
