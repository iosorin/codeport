import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Backdrop, Props, DEFAULT_MS } from '.';

export default {
    title: 'Atoms/Backdrop',
    component: Backdrop,
    argTypes: {
        visible: { control: 'boolean' },
        onClick: { action: 'clicked' },
    },
} as Meta;

export const Basic: Story<Props> = (args) => <Backdrop {...args} />;
Basic.args = {
    msToShow: DEFAULT_MS,
};
