import React from 'react';
import { Tooltip as TooltipComponent } from '.';

export default {
	title: 'Atoms/Tooltip',
	component: TooltipComponent,
};

export const Tooltip = (args) => <TooltipComponent {...args}>activator</TooltipComponent>;

Tooltip.args = {
	text: 'text',
};
