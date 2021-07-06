import { Logo } from '.';

export default {
	title: 'Atoms/Logo',
	component: Logo,
	parameters: {
		backgrounds: {
			default: 'dark',
			values: [{ name: 'dark', value: '#454545' }],
		},
	},
};

export { Logo };
