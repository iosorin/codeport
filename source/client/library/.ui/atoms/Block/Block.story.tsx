import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Block, Props } from '.';
// title
// icon
// small
export default {
    title: 'Atoms/Block',
    component: Block,
    argTypes: {
        size: {
            control: {
                type: 'inline-radio',
                options: ['small', 'medium', 'large'],
            },
        },

        background: {
            control: {
                type: 'inline-radio',
                options: ['light', 'dark', 'primary', 'success'],
            },
        },

        stretch: {
            control: {
                type: 'boolean',
            },
        },
    },
} as Meta;

const Template: Story<Props> = (args) => <Block {...args} />;

export const Dark = Template.bind({});
Dark.args = {
    background: 'primary',
    title: 'Block',
};

export const Success = Template.bind({});
Success.args = {
    background: 'success',
    title: 'Block',
};

export const Large = Template.bind({});
Large.args = {
    size: 'large',
    title: 'Block',
};

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    title: 'Block',
};
