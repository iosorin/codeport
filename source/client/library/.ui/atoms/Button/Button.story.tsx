import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Home } from 'react-feather';
import { Button, Props } from '.';

export default {
	title: 'Atoms/Button',
	component: Button,
} as Meta;

export const Template: Story<Props> = (args) => <Button label='label' {...args} />;

export const WithIcon: Story<Props> = () => (
	<Button>
		<Home />
	</Button>
);
