import React, { useState } from 'react';
import { Range as RangeComponent } from '.';

export default {
	title: 'Atoms/Range',
	component: RangeComponent,
};

export const Range = (args) => {
	const [value, setValue] = useState(args.value);

	return <RangeComponent {...args} value={value} onChange={setValue} />;
};

Range.args = {
	label: 'label',
	min: 0,
	max: 50,
	step: 2,
	value: 14,
	dark: true,
	units: ' units',
};
