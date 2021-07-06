import React from 'react';
import { Toasts as ToastsComponent } from '.';

export default {
	title: 'Atoms/Toasts',
	component: ToastsComponent,
	parameters: {
		backgrounds: {
			default: 'dark',
			values: [{ name: 'dark', value: '#454545' }],
		},
	},
};

export const Toasts = () => (
	<ToastsComponent
		toasts={[
			{ id: 1, message: 'Toast log', type: 'log', display: true },
			{ id: 2, message: 'Toast success', type: 'success', display: true },
			{ id: 3, message: 'Toast error', type: 'error', display: true },
		]}
	/>
);
