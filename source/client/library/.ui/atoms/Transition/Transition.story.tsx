import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Transition as TransitionComponent } from '.';

export default {
	title: 'Atoms/Transition',
	component: TransitionComponent,
} as Meta;

export const Transition = (args) => (
	<TransitionComponent {...args}>
		<h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, iste!</h1>
	</TransitionComponent>
);

Transition.args = {
	in: true,
	duration: 300,
	type: 'fade',
};
