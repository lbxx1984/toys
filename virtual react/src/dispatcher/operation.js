
define(function (require) {


    var _ = require('underscore');
    var tools = require('../core/tools');


    function copyChild(file, uuid) {
        var structure = tools.getElement(file.structure, uuid);
        var dataset = dumpDataset(file.dataset, structure);
        return {
            template: structure,
            dataset: dataset
        };
        function dumpDataset(dataset, structure) {
            var result = {};
            dumpChild(structure);
            return result;
            function dumpChild(child) {
                result[child.uuid] = dataset[child.uuid];
                child.children instanceof Array && child.children.map(dumpChild);
            }
        }
    }


    function removeChild(file, uuid) {
        var target = tools.getElementParent(file.structure, uuid);
        if (!target || target.type === 'TitleWindow' || target.type === 'ShojiScreen') {
            return;
        }
        var children = [];
        target.children.map(function (child) {
            if (child.uuid === uuid) {
                removeDataset(child);
                return;
            }
            children.push(child);
        });
        target.children = children;
        function removeDataset(child) {
            if (!child) return;
            delete file.dataset[child.uuid];
            child.children instanceof Array && child.children.map(removeDataset);
        }
    }


    return {
        'operation-delete': function () {
            var selectedWidget = this.get('selectedWidget');
            if (!selectedWidget) {
                return;
            }
            var obj = tools.getUpdateFile(this);
            removeChild(obj.file, selectedWidget);
            this.fill({
                files: obj.files,
                selectedWidget: ''
            });
        },
        'operation-cut': function () {
            var selectedWidget = this.get('selectedWidget');
            if (!selectedWidget) {
                return;
            }
            var obj = tools.getUpdateFile(this);
            var clip = copyChild(obj.file, selectedWidget);
            clip.optType = 'cut';
            removeChild(obj.file, selectedWidget);
            this.fill({
                files: obj.files,
                selectedWidget: '',
                clipboard: JSON.stringify(clip)
            });
        },
        'operation-copy': function () {
            var selectedWidget = this.get('selectedWidget');
            if (!selectedWidget) {
                return;
            }
            var obj = tools.getUpdateFile(this);
            var clip = copyChild(obj.file, selectedWidget);
            clip.optType = 'copy';
            this.fill({
                clipboard: JSON.stringify(clip)
            });
        },
        'operation-paste': function () {
            var selectedWidget = this.get('selectedWidget');
            var clipboard = this.get('clipboard');
            if (!clipboard) {
                return;
            }
            var obj = tools.getUpdateFile(this);
            var target = null;
            var insertType = 'child';
            // 获取粘贴位置
            if (selectedWidget) {
                target = tools.getElement(obj.file.structure, selectedWidget);
                if (!(target.children instanceof Array)) {
                    target = tools.getElementParent(obj.file.structure, selectedWidget);
                    insertType = 'little brother';
                }
            }
            else if (obj.file.structure.type === 'div') {
                target = obj.file.structure;
            }
            else {
                target = tools.getElement(obj.file.structure, 'window-container');
            }
            // 创建新对象
            var clip = JSON.parse(clipboard);
            clip.dataset = tools.updateTemplateUuid(clip.template, obj.file.structure, clip.dataset);
            // 灌入新对象
            if (insertType === 'little brother') {
                var children = [];
                target.children.map(function (item) {
                    children.push(item);
                    if (item.uuid === selectedWidget) {
                        children.push(clip.template);
                    }
                });
                target.children = children;
            }
            else {
                target.children.push(clip.template);
            }
            _.extend(obj.file.dataset, clip.dataset);
            // 回写数据
            this.fill({
                files: obj.files,
                clipboard: clip.optType === 'copy' ? clipboard : ''
            });
        }
    };


});
