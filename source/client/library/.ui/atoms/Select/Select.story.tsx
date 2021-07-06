import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { EDITOR_THEMES } from '@constants';
import { Select, Props } from '.';

export default {
	title: 'Atoms/Select',
	component: Select,
} as Meta;

export const Simple: Story<Props<string>> = (args) => <Select {...args} />;

Simple.args = {
	label: 'Options String',
	options: EDITOR_THEMES,
	value: EDITOR_THEMES[0],
};

export const Advanced: Story<Props<typeof advancedOptions[0]>> = (args) => <Select {...args} />;

let advancedOptions = [
	{ name: 'bla 1', value: 1 },
	{ name: 'bla 2', value: 2 },
];

Advanced.args = {
	label: 'Options Objects',
	titleKey: 'name',
	valueKey: 'value',
	value: advancedOptions[0],
	options: [...advancedOptions],
};
