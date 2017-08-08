
define(function (require) {


    var _ = require('underscore');
    var tools = require('../core/tools');
    var widgetsTemplate = require('../dataset/widgetsTemplate');


    return {

        'stage-insert-element': function (elementUuid, targetUuid, insertAfter) {
            var obj = tools.getUpdateFile(this);
            var element = tools.removeElement(obj.file.structure, elementUuid);
            tools[insertAfter ? 'insertAfter' : 'insertBefore'](obj.file.structure, element, targetUuid);
            this.set('files', obj.files);
        },

        'stage-append-element': function (elementUuid, targetUuid) {
            var obj = tools.getUpdateFile(this);
            var element = tools.removeElement(obj.file.structure, elementUuid);
            tools.appendTo(obj.file.structure, element, targetUuid);
            this.set('files', obj.files);
        },

        'stage-update-size': function (width, height) {
            var obj = tools.getUpdateFile(this);
            obj.file.width = width;
            obj.file.height = height;
            this.set('files', obj.files);
        },

        'stage-select-element': function (uuid) {
            this.set('selectedWidget', uuid);
        },

        'stage-click-element': function (uuid, isIndivisible, insertAfter) {
            var type = this.get('currentWidget');
            var customModulesHash = this.get('customModulesHash');
            var widget = widgetsTemplate[type] || customModulesHash[type];
            if (!widget) return;
            var obj = tools.getUpdateFile(this);

            // 处理待灌入的数据
            var dataset = JSON.parse(JSON.stringify(widget.dataset));
            var template = JSON.parse(JSON.stringify(widget.template));
            if (customModulesHash.hasOwnProperty(type)) {
                var typeId = tools.getWidgetId(obj.file.structure, widget.template.type);
                dataset[type] = dataset[type] || {};
                dataset[type]['data-uuid'] = typeId;
                dataset[type]['data-is-custom-module'] = true;
                obj.file.dataset[typeId] = dataset;
                template.uuid = typeId;
            }
            else if (!widget.replaceUUID) {
                var typeId = tools.getWidgetId(obj.file.structure, widget.template.type);
                obj.file.dataset[typeId] = dataset;
                template.uuid = typeId;
            }
            else if (widget.replaceUUID) {
                _.extend(
                    obj.file.dataset,
                    tools.updateTemplateUuid(template, obj.file.structure, dataset)
                );
            }

            // 灌入组件
            var target = null;
            if (isIndivisible) {
                target = tools.getElementParent(obj.file.structure, uuid);
                var children = [];
                target.children.map(function (item) {
                    if (item.uuid === uuid && !insertAfter) children.push(template);
                    children.push(item);
                    if (item.uuid === uuid && insertAfter) children.push(template);
                });
                target.children = children;
            }
            else {
                target = tools.getElement(obj.file.structure, uuid);
                target.children = target.children instanceof Array ? target.children : [];
                target.children.push(template);
            }
 
            // 回写数据
            this.fill({
                files: obj.files
            });
        }
    };

});
