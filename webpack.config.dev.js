let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ManifestPlugin = require('webpack-manifest-plugin');
let ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?reload=true&path=http://127.0.0.1:3000/__webpack_hmr',
            './web/src/HelloWord.js'
        ]
    },

    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'web/dev/assets'),
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },

    devtool: 'cheap-module-source-map',

    plugins: [
        /**
         * 全局开启热模块加载
         */
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            inject: false,//是否由插件注入标签，false表示用户手动配置（模板语法）
            template: path.resolve('web/src/index.html')
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // Specify the common bundle's name.
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),

        //提取样式
        new ExtractTextPlugin("styles.css"),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};

