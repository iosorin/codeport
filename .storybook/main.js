const custom = require('../config/webpack.dev.js');

module.exports = {
	core: { builder: 'webpack5' },

	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	// stories: ['../source/client/**/*.story.@(ts|tsx|mdx)'],
	stories: ['../source/client/library/.ui/**/*.story.tsx'],

	webpackFinal: (config) => ({
		...config,
		module: {
			...config.module,
			...custom.module,
		},
		resolve: {
			...config.resolve,
			...custom.resolve,
		},
		plugins: [...config.plugins, ...custom.plugins],
	}),
};
