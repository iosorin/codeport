import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Backdrop, Props } from '.';

export default {
	title: 'Atoms/Backdrop',
	component: Backdrop,
};

export const Template: Story<Props> = (args) => <Backdrop {...args} />;
