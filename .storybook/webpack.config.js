/*
    Storybook is not yet ready to work with Webpack 5 - after that we can just spread configs

    const common = require('../config/webpack.common');
*/

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const paths = require('../config/paths');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const coreCssRegex = [paths.styles, /\.shared.(css|scss)$/, /node_modules/];

module.exports = ({ config }) => {
	config.module.rules.push(
		{
			test: /\.(ts|tsx)$/,
			exclude: /node_modules/,
			use: [
				{
					loader: require.resolve('ts-loader'),
				},
			],
		},
		{
			test: /\.(scss|css)$/,
			include: coreCssRegex,
			use: devCssLoaders(),
		},
		{
			test: /\.(scss|css)$/,
			exclude: coreCssRegex,
			use: devCssLoaders(true),
		}
	);

	config.resolve.extensions = extensions;

	config.resolve.plugins.push(new TsconfigPathsPlugin({ configFile: './tsconfig.json' }));

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
				resources: [
					paths.styles + '/resources/_variables.scss',
					paths.styles + '/resources/_mixins.scss',
				],
			},
		},
	];
}
