
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        './src/main.js'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf|html|txt)\??.*$/,
                loader: 'url-loader?limit=8096&name=[path][name].[ext]'
            }
        ]
    }
};