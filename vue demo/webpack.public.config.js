

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


let demos = fs.readdirSync(path.resolve(__dirname, 'src/demos'));
let fileContentHash = {};
demos.map(filename => {
    fileContentHash[filename] = fs.readFileSync(path.resolve(__dirname, 'src/demos/' + filename), 'utf-8');
});
fs.writeFileSync(
    path.resolve(__dirname, 'src/codeMap.js'),
    'export default ' + JSON.stringify(fileContentHash) + ';'
);


module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png|html)\??.*$/,
                loader: 'file-loader?limit=1&name=[path][name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.ejs'),
        }),
        new UglifyJSPlugin(),
        new ExtractTextPlugin('css/style[hash].css')
    ],
    resolve: {
        extensions: ['.js'],
        alias: {
            'vue$': 'vue/dist/vue.runtime'
        }
    }
};
