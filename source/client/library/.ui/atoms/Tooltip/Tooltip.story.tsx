import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Tooltip, Props } from '.';

export default {
	title: 'Atoms/Tooltip',
	component: Tooltip,
} as Meta;

export const Template: Story<Props> = (args) => <Tooltip {...args}>activator</Tooltip>;
