import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Logo, Props } from '.';

export default {
	title: 'Atoms/Logo',
	component: Logo,
	parameters: {
		backgrounds: {
			default: 'dark',
			values: [{ name: 'dark', value: '#454545' }],
		},
	},
} as Meta;

export const Template: Story<Props> = (args) => <Logo {...args} />;
