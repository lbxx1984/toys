// 跟业务有关的工具集
define(function (require) {

    var _ = require('underscore');

    return {
        // 将键盘事件对象翻译成字符串
        getHotKey(evt) {
            var result = '';
            if (evt.ctrlKey) {
                result = 'ctrl + ';
            }
            if (evt.altKey) {
                result += 'alt + ';
            }
            if (evt.shiftKey) {
                result += 'shift + ';
            }
            return result + evt.code.replace('Key', '').toLowerCase();
        },
        // 遍历文档结构，获取一个未使用的type类型组件的id
        getWidgetId(structure, type) {
            structure = JSON.stringify(structure);
            type = type.replace(/(\w)/, function (v) {
                return v.toLowerCase();
            });
            var index = 0;
            while (structure.indexOf('"uuid":"' + type + index + '"') > -1) index++;
            return type + index;
        },
        // 从model中制作一个可编辑的文件树副本对象
        getUpdateFile(me) {
            var files = [].concat(me.get('files'));
            var current = me.get('currentFile');
            var file = JSON.parse(JSON.stringify(files[current]));
            files[current] = file;
            return {
                files: files,
                file: file
            };
        },
        // 从tree中返回uuid节点，如果没有返回null
        getElement(tree, uuid) {
            var result = null;
            find(tree);
            function find(node) {
                if (node && node.uuid === uuid) {
                    result = node;
                    return;
                }
                if (!(node.children instanceof Array) || !node.children.length) return;
                node.children.map(find);
            }
            return result;
        },
        // 从tree中返回uuid的父节点，如果uuid是根或不存在，返回null，否则返回uuid的父亲
        getElementParent(tree, uuid) {
            var result = null;
            find(tree);
            function find(node) {
                if (result || !(node.children instanceof Array) || !node.children.length) return;
                node.children.map(function (child) {
                    if (child.uuid === uuid) {
                        result = node;
                    }
                });
                if (result) return;
                node.children.map(find);
            }
            return result;
        },
        // 在tree中寻找targetUuid节点，将srcObj添加成这个节点的孩子
        // 此方法对tree进行指针操作；
        appendTo(tree, srcObj, targetUuid) {
            var parentNode = this.getElement(tree, targetUuid);
            if (!parentNode || !srcObj) return;
            srcObj = JSON.parse(JSON.stringify(srcObj));
            if (parentNode.children instanceof Array) {
                parentNode.children.push(srcObj);
            }
            else {
                parentNode.children = [srcObj];
            }
        },
        // 在tree中查找targetUuid节点，在targetUuid节点的前面插入srcObj节点
        // 此方法对tree进行指针操作；
        insertBefore(tree, srcObj, targetUuid) {
            var parentNode = this.getElementParent(tree, targetUuid);
            if (!parentNode || !srcObj) return;
            srcObj = JSON.parse(JSON.stringify(srcObj));
            var arr = [];
            parentNode.children.map(function (child, index) {
                if (child.uuid === targetUuid) {
                    arr.push(srcObj);
                    arr.push(child);
                }
                else {
                    arr.push(child)
                }
            });
            parentNode.children = arr;
        },
        // 在tree中查找targetUuid节点，在targetUuid节点的后面插入srcObj节点
        // 此方法对tree进行指针操作；
        insertAfter(tree, srcObj, targetUuid) {
            var parentNode = this.getElementParent(tree, targetUuid);
            if (!parentNode || !srcObj) return;
            srcObj = JSON.parse(JSON.stringify(srcObj));
            var arr = [];
            parentNode.children.map(function (child, index) {
                if (child.uuid === targetUuid) {
                    arr.push(child);
                    arr.push(srcObj);
                }
                else {
                    arr.push(child)
                }
            });
            parentNode.children = arr;
        },
        // 从tree中删除uuid节点，并将这个节点返回；如果uuid刚好是根节点或没有uuid节点，返回null；
        // 此方法对tree进行指针操作；
        removeElement: function (tree, uuid) {
            var result = null;
            if (!tree || tree.uuid === uuid) {
                return null;
            }
            filterChildren(tree);
            function filterChildren(node) {
                if (result) return;
                if (!(node.children instanceof Array) || !node.children.length) return;
                var arr = [];
                node.children.map(function (child) {
                    if (child && child.uuid === uuid) {
                        result = child;
                    }
                    else {
                        arr.push(child);
                    }
                });
                node.children = arr;
                if (result) return;
                node.children.map(filterChildren);
            }
            return result;
        },
        // 根据structure的结构，更新template结构中的所有uuid，更新后template对应的dataset
        // 此方法对template进行指针操作；
        updateTemplateUuid: function (template, structure, dataset) {
            var me = this;
            var usedUuid = {};
            var newDataset = {};
            updateUuid(template);
            return newDataset;
            function updateUuid(child) {
                var uuid = child.uuid;
                var type = uuid.replace(/\d+/g, '');
                var index = null;
                if (usedUuid.hasOwnProperty(type)) {
                    usedUuid[type]++;
                    index = usedUuid[type];
                }
                else {
                    usedUuid[type] = +me.getWidgetId(structure, type).replace(/[a-zA-Z]/g, '');
                    index = usedUuid[type];
                }
                var newId = type + index;
                child.uuid = newId;
                newDataset[newId] = dataset[uuid];
                child.children instanceof Array && child.children.map(updateUuid);
            }
        }
    };

});
