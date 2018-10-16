const path = require('path')
const root = path.resolve(__dirname)
const webpack = require('webpack')
const htmlWebpackplugin = require('html-webpack-plugin')
const uglifyjs = require('uglifyjs-webpack-plugin')
const minify = require('mini-css-extract-plugin')
// const clean = require('clean-webpack-plugin')

// const ASSET_PATH = process.env.ASSET_PATH || './';
module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: path.join(root, 'dist'),
        filename: '[name].build.js',
        publicPath: './'
    },
    mode: 'development',
    // devServer: {
    //     port: 8888,
    //     open: true
    // },
    module: {
        rules: [
            { test: /\.(less|css)$/, use: [minify.loader, 'css-loader', 'less-loader'] },
            { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'img/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.mp3$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: 'music/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new htmlWebpackplugin({
            title: 'musicPlayer',
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        new uglifyjs(),
        new minify({
            filename: '[name].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        // new clean(['dist']),
        // new webpack.DefinePlugin({
        //     'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
        // })

    ]
}