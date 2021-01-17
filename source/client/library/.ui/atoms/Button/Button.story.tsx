import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Home } from 'react-feather';

import { Button, Props } from '.';

export default {
    title: 'Atoms/Button',
    component: Button,
    argTypes: {
        onClick: { action: 'clicked' },
        background: { control: 'color' },
        size: {
            control: {
                type: 'inline-radio',
                options: ['small', 'medium', 'large'],
            },
        },
        rounded: {
            control: {
                type: 'boolean',
            },
        },
        loading: {
            control: {
                type: 'boolean',
            },
        },
    },
} as Meta;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    primary: true,
    label: 'Button',
};

export const Success = Template.bind({});
Success.args = {
    success: true,
    label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
    label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
    size: 'large',
    label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    label: 'Button',
};

export const Rounded: Story<Props> = () => (
    <Button rounded>
        <Home />
    </Button>
);

export const Loading: Story<Props> = () => (
    <Button loading>
        <Home />
    </Button>
);
