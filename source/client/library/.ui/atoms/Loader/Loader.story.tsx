import { Loader } from '.';

export default {
	title: 'Atoms/Loader',
	component: Loader,
	parameters: {
		backgrounds: {
			default: 'dark',
			values: [{ name: 'dark', value: '#454545' }],
		},
	},
};

export { Loader };
