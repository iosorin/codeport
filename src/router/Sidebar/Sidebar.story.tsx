import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Sidebar, Props } from '.';

export default {
    title: 'Organisms/Sidebar',
    component: Sidebar,
    decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

export const Basic: Story<Props> = (args) => <Sidebar {...args} />;
