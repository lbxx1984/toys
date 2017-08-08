
define(function (require) {
    return [
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '<meta charset="utf-8">',
        '<link href="src/css/stage.css" type="text/css" rel="stylesheet" charset="utf-8"/>',
        '<script type="text/javascript" src="dep/html2canvas.0.5.0.min.js"></script>',
        '<script type="text/javascript" src="dep/require.2.1.11.min.js"></script>',
        '<script type="text/javascript" src="src/stage/sdk.js"></script>',
        '<script type="text/javascript">',
        'var sdkMode = "/* mode */";',
        'var appName = "/* appName */";',
        'var dataset = /* dataset */;',
        '/* props deps */',
        '/* code */',
        '</script>',
        '</head>',
        '<body onselectstart="return false"></body>',
        '<script type="text/javascript" src="src/stage/init.js"></script>',
        '</html>'
    ].join('\n');
});
