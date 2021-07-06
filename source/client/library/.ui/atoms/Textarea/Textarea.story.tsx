import React, { useState } from 'react';
import { Textarea as TextareaComponent } from '.';

export default {
	title: 'Atoms/Textarea',
	component: TextareaComponent,
};

export const Textarea = (args) => {
	const [value, setValue] = useState('value');

	return (
		<TextareaComponent
			{...args}
			value={value}
			onChange={(event) => setValue(event.currentTarget.value)}
		/>
	);
};
