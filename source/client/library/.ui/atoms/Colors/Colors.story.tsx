import { Colors } from '.';

export default {
	title: 'Atoms/Colors',
	component: Colors,
	parameters: {
		backgrounds: {
			default: 'dark',
			values: [{ name: 'dark', value: '#454545' }],
		},
	},
};

export { Colors };
