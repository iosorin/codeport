import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Dialog as DialogComponent } from '.';

export default {
	title: 'Molecules/Dialog',
	component: DialogComponent,
} as Meta;

export const Dialog = (args) => {
	return (
		<DialogComponent {...args}>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas temporibus, reiciendis
			laudantium autem animi consequuntur libero, nihil cumque necessitatibus dolorum, nisi
			deserunt. Deleniti repudiandae nulla porro, quasi accusamus voluptatibus voluptatum ea magnam
			iste nisi fugit quam distinctio fugiat commodi enim.
		</DialogComponent>
	);
};

Dialog.args = { title: 'Dialog title', visible: true, closeIcon: true };
