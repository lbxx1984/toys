
define(function (require) {

    return {
        OPEN_MODULES: 'div;span;TitleWindow;a;p;',
        LEFT_BAR_WIDTH: 250,
        RIGHT_BAR_WIDTH: 300,
        arrestedHotKey: [
            'ctrl + s',
            'f5',
            'ctrl + w',
            'ctrl + n',
            'ctrl + o',
            'alt + f',
            'alt + e',
            'alt + d',
            'alt + s'
        ],
        menu: [
            {label: '文件', value: 'file'},
            {label: '开始', value: 'start'}
        ],
        componentsType: [
            {label: '原生组件', value: 'primary-dom'},
            {label: '布局组件', value: 'layout'},
            {hr: true},
            {label: '基础组件', value: 'fcui2-base'},
            {label: '输入组件', value: 'fcui2-input'},
            {hr: true},
            {label: '自定义组件', value: 'custom-module'}
        ],
        editorType: [
            {label: '可视模式', value: ''},
            {label: '专家模式', value: 'expert'}
        ],
        widgets: {
            'fcui2-base': [
                {
                    label: 'Button',
                    value: 'fcui2/Button.jsx',
                    tip: {
                        width: 210, height: 200, image: 'resource/images/fcui2-button.jpg'
                    }
                },
                {
                    label: 'Tip',
                    value: 'fcui2/Tip.jsx'
                },
                {
                    label: 'List',
                    value: 'fcui2/List.jsx'
                },
                {
                    label: 'DropDownList',
                    value: 'fcui2/DropDownList.jsx'
                }
            ],
            'fcui2-input': [
                {
                    label: 'TextBox（文本框）',
                    value: 'fcui2/TextBox.jsx'
                }
            ],
            'primary-dom': [
                {
                    label: '普通文本',
                    value: 'dom-span'
                },
                {
                    label: '链接',
                    value: 'dom-a'
                },
                {
                    label: '段落',
                    value: 'dom-p'
                },
                {
                    label: '图片',
                    value: 'dom-img'
                },
                {
                    label: '图标',
                    value: 'dom-icon'
                },
                {
                    label: '换行符',
                    value: 'dom-br'
                },
                {
                    label: '分割线',
                    value: 'dom-hr'
                }
            ],
            'layout': [
                {
                    label: '基础容器',
                    value: 'container-base'
                },
                {
                    label: '双栏-左侧定宽',
                    value: 'container-two-columns-left'
                },
                {
                    label: '双栏-右侧定宽',
                    value: 'container-two-columns-right'
                },
                {
                    label: '三栏-两侧定宽',
                    value: 'container-three-columns'
                }
            ]
        }
    };

});
