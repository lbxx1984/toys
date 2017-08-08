

function SDK(mode) {
    // 绑定上下文
    this.___mousedown___ = this.___mousedown___.bind(this);
    this.___mousemove___ = this.___mousemove___.bind(this);
    this.___mouseup___ = this.___mouseup___.bind(this);
    this.___mouseleave___ = this.___mouseleave___.bind(this);
    this.___keydown___ = this.___keydown___.bind(this);
    this.___gotcanvas___ = this.___gotcanvas___.bind(this);
    // 颜色配置
    this.colors = {
        hover: 'sdk-hover',
        selected: 'sdk-selected',
        hoverSelected: 'sdk-hover-selected'
    };
    this.arrestedHotKey = [
        'ctrl + s',
        'f5',
        'ctrl + w',
        'ctrl + n',
        'ctrl + o',
        'alt + f',
        'alt + e',
        'alt + d',
        'alt + s'
    ];
    // 当前的工作模式：select 选择元素；drag 拖拽元素；click 点击元素
    this.mode = mode;
    // 当前鼠标下的物体
    this.hover = null;
    // 当前选中的物体
    this.selected = null;
    // 当前拖动状态的物体
    this.dragging = null;
    // 鼠标是否按下
    this.mousedown = false;
    // 鼠标伴随的图片
    this.image = null;
    // 绑定事件
    document.body.addEventListener('mousedown', this.___mousedown___);
    window.addEventListener('mousemove', this.___mousemove___);
    window.addEventListener('mouseup', this.___mouseup___);
    document.body.addEventListener('mouseleave', this.___mouseleave___);
    document.body.addEventListener('keydown', this.___keydown___);
}


/**
 * 外部接口方法
 */
SDK.prototype.setSelected = function (uuid) {
    var arr = document.getElementsByTagName('*');
    var target = null;
    if (!uuid && this.selected) {
        this._setElementColor_(this.selected, '');
        this.selected = null;
        return;
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].dataset.uuid === uuid) {
            target = arr[i];
            break;
        }
    }
    if (target) {
        if (this.selected) {
            this._setElementColor_(this.selected, '');
        }
        this.selected = target;
        this._setElementColor_(target, this.colors.selected);
    }
};


/**
 * 内部工具方法
 */
// 获取快捷键
SDK.prototype._getHotKey_ = function (evt) {
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
};
// 获取iframe外部传进来的回调
SDK.prototype._getCallback_ = function () {
    if (window && window.parent && window.parent.window && typeof window.parent.window.stageCallBack === 'function') {
        return window.parent.window.stageCallBack;
    }
    else {
        return new Function();
    }
};
// 获取鼠标下的可拖拽模块
SDK.prototype._getHoverElement_ = function (evt) {
    var target = evt.target;
    if (!target.dataset) return;
    while(!target.dataset.uuid) {
        target = target.parentNode;
        if (!target.dataset) return;
    }
    return target;
};
// 设置模块颜色
SDK.prototype._setElementColor_ = function (target, color) {
    target.__className__ = typeof target.__className__ === 'string' ? target.__className__ : target.className;
    target.className = target.__className__ + ' ' + color;
};
// 清理模块的hover状态
SDK.prototype._clearHover_ = function () {
    if (!this.hover) return;
    this._setElementColor_(this.hover, this.hover === this.selected ? this.colors.selected : '');
    this.hover = null;
};
// 清理模块的选中状态
SDK.prototype._clearSelected_ = function () {
    if (!this.selected) return;
    this._setElementColor_(this.selected, this.selected === this.hover ? this.colors.hover : '');
    this.selected = null;
};
// 清理随鼠标移动的缩略图
SDK.prototype._clearImage_ = function () {
    this.image = null;
    var images = document.body.getElementsByClassName('dragging-clips');
    if (!images.length) return;
    for (var i = 0; i < images.length; i++) {
        document.body.removeChild(images[i]);
    }
};
// 判断模块是否可分解，即模块是否能包含其他模块
SDK.prototype._isIndivisible_ = function (dom) {
    var INDIVISIBLE = 'a;span;p;br;hr;img;input;';
    return dom.className.indexOf('fcui2-') === 0
        || dom.dataset.isCustomModule
        || INDIVISIBLE.indexOf(dom.tagName.toLowerCase() + ';') > -1
};
// 将element模块插入到target模块的前方或后方
SDK.prototype._insert_ = function (element, target, insertAfter) {
    element.parentNode.removeChild(element);
    if (insertAfter) {
        if (target.parentNode.lastChild === target) {
            target.parentNode.appendChild(element);
        }
        else {
            target.parentNode.insertBefore(element, target.nextSibling);
        }
    }
    else {
        target.parentNode.insertBefore(element, target);
    }
};
// 将element模块插入到target模块内部
SDK.prototype._append_ = function (element, target) {
    element.parentNode.removeChild(element);
    target.appendChild(element);
};


/**
 * 内部事件
 */
SDK.prototype.___gotcanvas___ = function (canvas) {
    if (!this.mousedown) return;
    this.image = document.createElement('img');
    this.image.className = 'dragging-clips';
    this.image.src = canvas.toDataURL();
    this.image.style.top = this.clientY + 10 + 'px';
    this.image.style.left = this.clientX + 10 + 'px';
    document.body.appendChild(this.image);
};

SDK.prototype.___mouseleave___ = function (evt) {
    this.mousedown = false;
    this._clearHover_();
};

SDK.prototype.___mousedown___ = function (evt) {
    evt.stopPropagation();
    this.mousedown = true;
    if (evt.button === 2) return;
    var target = this._getHoverElement_(evt);
    if (!target) return;
    if (this.mode === 'drag') {
        this._clearHover_();
        this._clearSelected_();
        this.dragging = target;
        this.clientY = evt.clientY;
        this.clientX = evt.clientX;
        html2canvas(target, {
            allowTaint: true,
            taintTest: false,
            onrendered: this.___gotcanvas___
        });
    }
};

SDK.prototype.___mousemove___ = function (evt) {
    if (this.image) {
        this.image.style.top = evt.clientY + 10 + 'px';
        this.image.style.left = evt.clientX + 10 + 'px'; 
    }
    var target = this._getHoverElement_(evt);
    if (!target) return;
    if (this.mode === 'select' || this.mode === 'drag' || this.mode === 'click') {
        this._clearHover_();
        this.hover = target;
        this._setElementColor_(
            target,
            target === this.selected ? this.colors.hoverSelected : this.colors.hover
        );
    }
};

SDK.prototype.___mouseup___ = function (evt) {
    evt.stopPropagation();
    this.mousedown = false;
    this._clearHover_();
    this._clearImage_();
    if (evt.button === 2) return;
    var target = this._getHoverElement_(evt);
    var callback = this._getCallback_();
    var insertAfter = false;
    if (!target) return;
    insertAfter = evt.layerX > target.offsetWidth * 0.5;
    // 处理点击业务
    if (this.mode === 'click') {
        callback('stage-click-element', target.dataset.uuid, this._isIndivisible_(target), insertAfter);
        return;
    }
    // 处理选择业务
    if (this.mode === 'select') {
        this._clearSelected_();
        this.selected = target;
        this._setElementColor_(target, this.colors.selected);
        callback('stage-select-element', target.dataset.uuid);
        return;
    }
    // 处理拖拽业务
    if (this.mode === 'drag' && this.dragging) {
        var draggingId = this.dragging.dataset.uuid;
        var targetId = target.dataset.uuid;
        // 拖拽的和目标点是同一个元素，或目标点是拖拽元素的孩子
        if (
            draggingId === targetId
            || this.dragging.innerHTML.indexOf('data-uuid="' + targetId + '"') > -1
        ) {
            return; 
        }
        // 无法添加到内部的元素，只能在元素前后防止
        if (this._isIndivisible_(target)) {
            this._insert_(this.dragging, target, insertAfter);
            callback('stage-insert-element', draggingId, targetId, insertAfter);
        }
        // 插入到目标内部
        else {
            this._append_(this.dragging, target);
            callback('stage-append-element', draggingId, targetId);
        }
    }
};

SDK.prototype.___keydown___ = function (evt) {
    var key = this._getHotKey_(evt);
    var callback = this._getCallback_();
    callback('hotkey:' + key);
    // 组织浏览器默认快捷键行为
    if (this.arrestedHotKey.indexOf(key) > -1) {
        evt.preventDefault();  
        window.event.returnValue = false;
        return false;
    }
};
