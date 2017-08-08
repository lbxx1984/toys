define(function (require) {


    return function (files) {
        var result = [];
        files.map(function (file) {
            if (file.foldername !== 'css') {
                return;
            }
            result.push('@import "./css/' + file.filename + '";');
        });
        return result;
    };

});
