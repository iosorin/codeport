import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Logo, Props } from '.';

export default {
    title: 'Atoms/Logo',
    component: Logo,
    argTypes: {
        short: { control: 'boolean' },
    },
    parameters: {
        backgrounds: {
            default: 'dark',
            values: [{ name: 'dark', value: '#454545' }],
        },
    },
} as Meta;

export const Basic: Story<Props> = (args) => <Logo {...args} />;
