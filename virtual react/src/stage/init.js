
var inited = false;

window.sdk = new SDK(this.sdkMode);

// 禁止所有原生输入组件工作
function disabledInput() {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].readOnly = true;
    }
    var a = document.getElementsByTagName('a');
    for (i = 0; i < a.length; i++) {
        a[i].onclick = function (e) {
            if (e && e.preventDefault) {
                e.preventDefault(); 
            } 
            else {
                window.event.returnValue = false; 
            }
            return false; 
        };
    }
}

// 遍历属性集，寻找字符串形式导入的依赖，如：{a : "require('fcui2/Button.jsx')"}
function getPropsModules(props, _, arr) {
    var result = arr || [];
    if (typeof props === 'string') {
        if (props.indexOf('require(\'') === 0) {
            arr.push(props.replace('require(\'', '').replace('\')', ''));
        }
        return;
    }
    else if (props instanceof Array) {
        props.map(findChild);
        return;
    }
    else if (typeof props === 'object' && _.keys(props).length) {
        _.each(props, findChild);
    }
    function findChild(item) {
        getPropsModules(item, _, result);
    }
    return result;
}

// 将异步加载好的依赖注入到属性集中
function mergePropsModules(props, modules, args, _) {
    if (props instanceof Array) {
        props.map(mergeChild);
        return;
    }
    if (typeof props === 'object') {
        mergeSelf(props);
        _.each(props, function (item, key) {
            if (typeof item === 'object') {
                mergeChild(item);
                return;
            }
            if (item instanceof Array) {
                item.map(mergeChild);
                return;
            }
        });
    }
    function mergeSelf(father) {
        _.each(father, function (value, key) {
            if (typeof value === 'string' && value.indexOf('require(\'') === 0) {
                var index = modules.indexOf(value.replace('require(\'', '').replace('\')', ''));
                index < args.length && (father[key] = args[index]);
            }
        });
    }
    function mergeChild(child) {
        mergePropsModules(child, modules, args, _);
    }
}

// 渲染页面的方法工厂
function renderFactory(ReactDOM, React, App, _) {
    return function (props) {
        var modules = getPropsModules(props, _);
        require(modules, function () {
            mergePropsModules(props, modules, arguments, _);
            ReactDOM.render(React.createElement(App, props), document.body, function () {
                disabledInput();
                !inited && window.parent.stageCallBack('rendered', document.body.clientWidth, document.body.clientHeight);
                inited = true;
                if (window.sdk.selected) {
                    if (window.sdk.selected.className.indexOf('sdk-') < 0) {
                        window.sdk.selected.__className__ = window.sdk.selected.className;
                    }
                }
            });
        });
    }
}

require.config({
    baseUrl: './src',
    paths: {
        'react-dom': '../dep/react-dom.15.3.1.min',
        'react': '../dep/react.15.3.1.min',
        'underscore': '../dep/underscore.1.8.5'
    },
    packages: [
        {
            name: 'fcui2',
            location: '../dep/fcui2/src',
            main: 'main'
        }
    ]
});

define('main', ['react', 'react-dom', 'underscore', appName], function (React, ReactDOM, _, App) {
    window.setAppProps = renderFactory(ReactDOM, React, App, _);
    window.setAppProps(window.dataset || {});
});

require(['main']);
