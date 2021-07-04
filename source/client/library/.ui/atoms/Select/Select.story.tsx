import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { EDITOR_THEMES } from '@/library/constants';
import { Select, Props } from '.';

export default {
	title: 'Atoms/Select',
	component: Select,
} as Meta;

export const Template: Story<Props<string>> = (args) => <Select {...args} />;
Template.args = {
	label: 'THEME',
	value: 'default',
	options: EDITOR_THEMES,
	onChange: (selected) => (Template.args.value = selected),
};
