import React from 'react';
import { Drawer as DrawerComponent } from '.';

export default {
	title: 'Molecules/Drawer',
	component: DrawerComponent,
};

export const Drawer = (args) => <DrawerComponent {...args} />;

Drawer.args = { title: 'Drawer title', visible: true, closeIcon: false, persistent: false };
