import React, { useState } from 'react';
import { Tabs as TabsComponent } from '.';

export default {
	title: 'Atoms/Tabs',
	component: TabsComponent,
};

export const Tabs = (args) => {
	const [value, setValue] = useState(args.active);

	return <TabsComponent {...args} active={value} onChange={setValue} />;
};

Tabs.args = {
	list: [1, 2, 3],
	active: 1,
};
