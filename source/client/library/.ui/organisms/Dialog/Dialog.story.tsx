import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Dialog, Props } from '.';

export default {
    title: 'Organisms/Dialog',
    component: Dialog,
    argTypes: {
        hide: { action: 'hide' },
        persistent: { action: 'boolean' },
    },
} as Meta;

export const Basic: Story<Props> = (args) => (
    <Dialog {...args}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptatem.
    </Dialog>
);

Basic.args = { title: 'Dialog title', isVisible: true, closeIcon: true };
