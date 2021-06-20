import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Loader, Props } from '.';

export default {
	title: 'Atoms/Loader',
	component: Loader,
	argTypes: {
		color: { control: 'color' },
		size: {
			defaultValue: 40,
			control: 'number',
		},
		dur: {
			defaultValue: '1.5s',
		},
		type: {
			control: {
				type: 'inline-radio',
				options: ['dots', 'spinner'],
			},
		},
	},
} as Meta;

const Template: Story<Props> = (args) => <Loader {...args} />;

export const Dots = Template.bind({});
Dots.args = {
	type: 'type',
};

export const Spinner = Template.bind({});
Spinner.args = {
	type: 'spinner',
};
