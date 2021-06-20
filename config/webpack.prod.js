const paths = require('./paths');
const common = require('./webpack.common');
const webpack = require('webpack');
const dotenv = require('dotenv').config().parsed;
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const generateScopedName = require('./helpers/generateScopedName');

const coreCssRegex = [paths.styles, /\.shared.(css|scss)$/, /node_modules/];

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				include: coreCssRegex,
				use: cssLoaders(),
			},
			{
				test: /\.(scss|css)$/,
				exclude: coreCssRegex,
				use: cssLoaders(true),
			},
		],
	},
	plugins: plugins(),
	optimization: {
		minimizer: [
			new TerserPlugin({ extractComments: false }),
			new OptimizeCssAssetsPlugin(),
		],
		sideEffects: false,
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
		runtimeChunk: 'single',
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});

function plugins() {
	const plugins = [
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[fullhash].css',
			chunkFilename: 'styles/[name].[id].[fullhash].css',
			ignoreOrder: false,
		}),
		new HtmlWebpackPlugin({
			title: dotenv.TITLE,
			template: paths.public + '/template.html',
			favicon: paths.public + '/favicon.ico',
			hash: true,
		}),
		new webpack.SourceMapDevToolPlugin({
			exclude: ['/node_modules/'],
		}),
	];

	if (process.env.analyze) {
		plugins.push(
			new BundleAnalyzerPlugin({
				analyzerPort: 4000,
				analyzerMode: 'static',
			})
		);
	}

	return plugins;
}

function cssLoaders(useModules) {
	return [
		MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				sourceMap: false,
				importLoaders: 2,
				modules: useModules
					? {
							getLocalIdent: (context, _, localName) => {
								return generateScopedName(localName, context.resourcePath);
							},
					  }
					: false,
			},
		},
		{
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					config: './config/postcss.config.js',
				},
			},
		},
		'sass-loader',
		{
			loader: 'sass-resources-loader',
			options: {
				sourceMap: false,
				resources: [
					paths.styles + '/resources/_variables.scss',
					paths.styles + '/resources/_mixins.scss',
				],
			},
		},
	];
}
