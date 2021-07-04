import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Dialog, Props } from '.';

export default {
	title: 'Organisms/Dialog',
	component: Dialog,
	argTypes: {
		hide: { action: 'hide' },
		persistent: { action: 'boolean' },
	},
} as Meta;

export const Template: Story<Props> = (args) => (
	<Dialog {...args}>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas temporibus, reiciendis
		laudantium autem animi consequuntur libero, nihil cumque necessitatibus dolorum, nisi deserunt.
		Deleniti repudiandae nulla porro, quasi accusamus voluptatibus voluptatum ea magnam iste nisi
		fugit quam distinctio fugiat commodi enim.
	</Dialog>
);

Template.args = { title: 'Dialog title', visible: true, closeIcon: true };
