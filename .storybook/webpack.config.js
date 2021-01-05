/*
    Storybook is not yet ready to work with Webpack 5 - after that we can just spread configs

    const common = require('../config/webpack.common');
*/

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const paths = require('../config/paths');

module.exports = ({ config }) => {
    config.module.rules.push(
        {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: require.resolve('ts-loader')
                },
            ]
        },
        {
            test: /\.(scss|css)$/,
            include: [
                /resources/,
                /\.shared.(css|scss)$/
            ],
            use: devCssLoaders(),
        },
        {
            test: /\.(scss|css)$/,
            exclude: [
                /\.shared.(css|scss)$/
            ],
            use: devCssLoaders(true),
        },
    );

    config.resolve.extensions.push('.ts', '.tsx');

    config.resolve.plugins.push(new TsconfigPathsPlugin({ configFile: "./tsconfig.json" }))

    return config;
};

/* webpack.dev.js */
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
                resources: [paths.scss + '/_variables.scss', paths.scss + '/_mixins.scss'],
            },
        },
    ];
}
