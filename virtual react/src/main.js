/**
 * @file 主启动
 * @author Brian Li
 * @email lbxxlht@163.com
 */
define(function (require) {


    var _ = require('underscore');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var App = require('App.jsx');


    var config = require('./config');
    var tools = require('./core/tools');
    var model = require('./core/model');
    var dispatcher = require('./dispatcher/index');

    // 载入默认的空文件
    var moduleTemplate = require('./dataset/moduleTemplate');

    // 载入自定义模块 demo
    var compiler = require('./core/compiler');
    var demo = require('./demo')('TextField');
    var demo2 = require('./demo2')('NormalForm');
    var demo3 = require('./demo3')('TipRenderer');
    var textField = {
        label: 'Text Field（文本域）',
        moduleName: 'TextField',
        template: {
            type: 'TextField',
            module: 'TextField'
        },
        dataset: demo.dataset,
        structure: demo.structure,
        code: compiler(demo.structure, true, true)
    };
    var normalForm = {
        label: 'Normal Form（普通表单）',
        moduleName: 'NormalForm',
        template: {
            type: 'NormalForm',
            module: 'NormalForm'
        },
        dataset: demo2.dataset,
        structure: demo2.structure,
        code: compiler(demo2.structure, true, true, true)
    };
    var tipRenderer = {
        label: 'Tip Renderer（提示渲染器）',
        moduleName: 'TipRenderer',
        template: {
            type: 'TipRenderer',
            module: 'TipRenderer'
        },
        dataset: demo3.dataset,
        structure: demo3.structure,
        code: compiler(demo3.structure, true, true, true)
    };


    // 快捷键事件
    document.body.addEventListener('keydown', function (event) {
        var key = tools.getHotKey(event);
        dispatch('hotkey:' + key);
        if (config.arrestedHotKey.indexOf(key) > -1) {
            event.preventDefault();  
            window.event.returnValue = false;
            return false;
        }
    });


    // 灌入初始数据
    model.fill({
        // 用户登录信息
        userInfo: {
            email: 'xxx@xxx.com'
        },
        // 剪切板
        clipboard: '',
        // 自定义组件队列
        customModules: [textField, normalForm, tipRenderer],
        // 自定义组件hash
        customModulesHash: {
            TextField: textField,
            NormalForm: normalForm,
            TipRenderer: tipRenderer
        },
        // 打开的文件列表
        files: [
            JSON.parse(JSON.stringify(moduleTemplate.panel))
        ],
        // 处于编辑状态的文件
        currentFile: 0,
        // 当前激活的menu item
        currentMenu: 'start',
        // 当前展开的组件树
        currentWidgetType: 'primary-dom',
        // 当前舞台工作模式
        currentStageMode: '',
        // 当前激活的组件（可以通过点击添加到舞台的组件模板id）
        currentWidget: '',
        // 当前组件属性编辑器的工作状态
        currentEditorType: 'expert',
        // 当前选中的组件的uuid（舞台中的组件实例）
        selectedWidget: '',
        // 是否始终显示tools container
        showToolsContainer: window.location.href.indexOf('menu') > -1,
        // 是否始终显示左侧操作栏
        showLeftBar: window.location.href.indexOf('left') > -1,
        // 是否始终显示右侧操作栏
        showRightBar: window.location.href.indexOf('right') > -1
    });


    model.onChange = function (store) {
        render(store);
    };
    render(model.store);


    function render(store) {
        var props = _.extend({}, store, {dispatch: dispatch});
        ReactDOM.render(React.createElement(App, props), document.body);
    }


    function dispatch() {
        if (arguments.length === 0) return;
        var args = [].slice.apply(arguments);
        var handler = args.shift();
        if (typeof handler !== 'string') {
            args.unshift(handler);
            handler = typeof handler.type === 'string' ? handler.type : '';
        }
        if (typeof dispatcher[handler] === 'function') {
            return dispatcher[handler].apply(model, args);
        }
    }


});
