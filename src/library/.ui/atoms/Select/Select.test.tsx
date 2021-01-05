import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';

import { OptionType, Select } from '.';

const options: OptionType[] = [{ value: '1' }, { value: '2' }, { value: '3' }];

const onChange = jest.fn();

const select = () => {
    return <Select onChange={onChange} options={options} />;
};

afterEach(cleanup);

describe('<Select />', () => {
    it('renders without crashing', () => {
        const { container } = render(select());

        expect(container.firstChild).toBeInTheDocument();
    });

    it('renders options', () => {
        const { getByText } = render(select());

        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('3')).toBeInTheDocument();
    });

    it('calls "onChange" props', () => {
        const { getByText } = render(select());

        fireEvent.click(getByText('2'));

        expect(onChange).toHaveBeenLastCalledWith({ value: '2' });
    });
});
