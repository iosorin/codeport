import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Loader, Props } from '.';

export default {
	title: 'Atoms/Loader',
	component: Loader,
	parameters: {
		backgrounds: {
			default: 'dark',
			values: [{ name: 'dark', value: '#454545' }],
		},
	},
} as Meta;

export const Template: Story<Props> = (args) => <Loader {...args} />;
