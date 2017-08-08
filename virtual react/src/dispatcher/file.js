
define(function (require) {


    var _ = require('underscore');
    var Zip = require('Zip');
    var fileSaver = require('fileSaver');


    var exporter = require('../core/exporter/nirvana/main');
    var tools = require('../core/tools');

    var Dialog = require('fcui2/Dialog.jsx');
    var moduleTemplate = require('../dataset/moduleTemplate');


    return {
        'file-delete': function (index) {
            var files = [].concat(this.get('files'));
            var current = this.get('currentFile');
            files.splice(index, 1);
            this.fill({
                files: files,
                currentFile: current >= index && current > 0 ? (current - 1) : current
            });
        },
        'file-new': function (type) {
            if (!moduleTemplate[type]) return;
            var file = JSON.parse(JSON.stringify(moduleTemplate[type]));
            var files = [].concat(this.get('files'), [file]);
            this.fill({
                files: files,
                currentFile: files.length - 1
            });
        },
        'file-export': function () {
            var file = this.get('files')[this.get('currentFile')];
            if (!file) return;
            var dialog = new Dialog();
            dialog.pop({
                appSkin: 'oneux3',
                title: '导出代码',
                content: require('../components/dialog/ExporterContent.jsx'),
                contentProps: {
                    files: exporter(file, this.get('customModulesHash'), this.get('userInfo'))
                }
            });
        },
        'file-download': function () {
            var file = this.get('files')[this.get('currentFile')];
            if (!file) return;
            var code = exporter(file, this.get('customModulesHash'), this.get('userInfo'));
            var zip = new Zip();
            code.map(function (item) {
                if (item.foldername) {
                    var folder = zip.folder(item.foldername);
                    folder.file(item.filename, item.code);
                }
                else {
                    zip.file(item.filename, item.code);
                }
            });
            zip.generateAsync({type: 'blob'}).then(function(content) {
                fileSaver(content, file.filename + '.zip');
            });
        },
        'file-update-dataset': function (dataset) {
            var obj = tools.getUpdateFile(this);
            let widget = this.get('selectedWidget');
            obj.file.dataset[widget] = dataset;
            this.set('files', obj.files);
        }
    };


});
