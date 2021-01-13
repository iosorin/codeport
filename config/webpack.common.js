const webpack = require('webpack');
const paths = require('./paths');
const dotenv = require('dotenv').config().parsed;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = {
    entry: [paths.src + '/index.tsx'],
    output: {
        path: paths.dist,
        filename: '[name].[fullhash].bundle.js',
        publicPath: dotenv.BASE_URL || '/',
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader',
            },
            { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
            { test: /\.(woff(2)?|eot|ttf|otf|svg)$/, type: 'asset/inline' },
        ],
    },
    resolve: {
        extensions,
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    plugins: [
        new MonacoWebpackPlugin({
            // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
            languages: dotenv.LANGUAGES.split(', '),
            features: [
                'anchorSelect',
                'bracketMatching',
                'caretOperations',
                'clipboard',
                'codeAction',
                'codelens',
                'colorDetector',
                'comment',
                'coreCommands',
                'cursorUndo',
                'fontZoom',
                'format',
                'inPlaceReplace',
                'indentation',
                'inspectTokens',
                'linesOperations',
                'multicursor',
                'onTypeRename',
                'quickCommand',
                'rename',
                'smartSelect',
                'suggest',
                'unusualLineTerminators',
                'wordOperations',
                'wordPartOperations',
            ],
        }),
        new webpack.DefinePlugin({ 'process.env': JSON.stringify(dotenv) }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: paths.dist,
                    globOptions: {
                        ignore: ['**/template.html', '**/favicon.ico'],
                    },
                },
                {
                    from: paths.media,
                    to: 'media',
                },
            ],
        }),
        new webpack.ProvidePlugin({ process: 'process/browser' }),
        new ESLintPlugin({
            extensions,
            context: paths.src,
        }),
        new webpack.ids.HashedModuleIdsPlugin(),
    ],
};
