import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Transition, Props, DEFAULT_DURATION } from '.';

export default {
    title: 'Atoms/Transition',
    component: Transition,
    argTypes: {
        type: {
            defaultValue: 'fade',
            control: {
                type: 'inline-radio',
                options: ['fade', 'zoom', 'slide-fade-up'],
            },
        },
        in: {
            defaultValue: true,
            control: 'boolean',
        },
        duration: {
            defaultValue: DEFAULT_DURATION,
            control: 'number',
        },
    },
} as Meta;

const Template: Story<Props> = (args) => (
    <Transition {...args}>
        <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, iste!</h1>
    </Transition>
);

export const Fade = Template.bind({});
Fade.args = {
    type: 'fade',
};

export const Zoom = Template.bind({});
Zoom.args = {
    type: 'zoom',
};

export const SlideFadeUp = Template.bind({});
SlideFadeUp.args = {
    type: 'slide-fade-up',
};
