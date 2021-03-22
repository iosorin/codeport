const paths = require('./paths');
const common = require('./webpack.common');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
require('dotenv').config();

const coreCssRegex = [paths.styles, /\.shared.(css|scss)$/, /node_modules/];

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                include: coreCssRegex,
                use: devCssLoaders(),
            },
            {
                test: /\.(scss|css)$/,
                exclude: coreCssRegex,
                use: devCssLoaders(true),
            },
        ],
    },
    devServer: {
        hot: true,
        open: true,
        compress: true,
        contentBase: paths.dist,
        port: process.env.PORT || 3000,
        historyApiFallback: true,
        proxy: {
            '/socket.io': {
                target: 'http://[::1]:' + process.env.SERVER_PORT,
                ws: true,
            },
            '/api': {
                target: 'http://[::1]:' + String(+process.env.SERVER_PORT + 1),
            },
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: process.env.TITLE,
            template: paths.public + '/template.html',
            favicon: paths.public + '/favicon.ico',
        }),
    ],
});

function devCssLoaders(useModules) {
    return [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                importLoaders: 1,
                modules: useModules
                    ? {
                          localIdentName: '[path][name]__[local]--[hash:base64:5]',
                          localIdentContext: paths.src,
                      }
                    : false,
            },
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
            },
        },
        {
            loader: 'sass-resources-loader',
            options: {
                sourceMap: true,
                resources: [
                    paths.styles + '/resources/_variables.scss',
                    paths.styles + '/resources/_mixins.scss',
                ],
            },
        },
    ];
}
