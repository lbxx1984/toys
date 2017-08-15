
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    devtool: '#source-map',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
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
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
};
