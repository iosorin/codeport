import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Select, Props } from '.';

const options = [{ value: 'Option One' }, { value: 'Option Two' }, { value: 'Option Three' }];
let selected = options[0].value;

/* broken */
export default {
    title: 'Atoms/Select',
    component: Select,
    parameters: { actions: { argTypesRegex: '^on.*' } },
    argTypes: {
        options: {
            defaultValue: options,
            control: {
                type: 'select',
                options,
            },
        },
        value: {
            defaultValue: selected,
        },
    },
} as Meta;

export const Basic: Story<Props> = (args) => <Select {...args} />;
Basic.args = {
    onChange: (value) => {
        selected = value;
    },
};
