import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Tooltip, Props } from '.';

export default {
	title: 'Atoms/Tooltip',
	component: Tooltip,
} as Meta;

const Template: Story<Props> = (args) => <Tooltip {...args}>activator</Tooltip>;

export const Basic = Template.bind({});
Basic.args = { content: 'Tooltip content' };

export const Error = Template.bind({});
Error.args = {
	content: 'Error Tooltip',
	error: true,
};
