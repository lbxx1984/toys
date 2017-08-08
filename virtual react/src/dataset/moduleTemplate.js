
define(function (require) {

    return {
        panel: {
            filename: 'untitled',
            width: 800,
            height: 600,
            fixedSize: false,
            saved: false,
            structure: {
                uuid: 'untitled',
                type: 'div',
                skin: 'oneux3',
                children: []
            },
            dataset: {
                untitled: {
                    style: {
                        backgroundColor: '#FFF',
                        width: '800px',
                        height: '600px'
                    }
                }
            }
        },
        titleWindow: {
            filename: 'untitled',
            width: 1000,
            height: 600,
            fixedSize: false,
            saved: false,
            structure: {
                uuid: 'untitled',
                type: 'TitleWindow',
                skin: 'oneux3',
                module: 'fcui2/TitleWindow.jsx',
                children: [
                    {
                        uuid: 'window-container',
                        type: 'div',
                        children: []
                    }
                ]
            },
            dataset: {
                untitled: {
                    isOpen: true,
                    title: 'Title Window'
                },
                'window-container': {
                    style: {
                        width: '950px',
                        height: '500px'
                    }
                }
            }
        },
        shojiScreen: {
            filename: 'untitled',
            width: 1100,
            height: 600,
            fixedSize: false,
            saved: false,
            structure: {
                uuid: 'untitled',
                type: 'ShojiScreen',
                skin: 'oneux3',
                module: 'fcui2/ShojiScreen.jsx',
                children: [
                    {
                        uuid: 'window-container',
                        type: 'div',
                        children: []
                    }
                ]
            },
            dataset: {
                untitled: {
                    isOpen: true,
                    workspaceWidth: '1000px'
                },
                'window-container': {
                    style: {
                        width: '1000px',
                        minHeight: '550px'
                    }
                }
            }
        }
    };

});
