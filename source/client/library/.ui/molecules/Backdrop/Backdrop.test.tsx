import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Backdrop } from '.';

afterEach(cleanup);

describe('<Backdrop />', () => {
    it('renders without crashing', () => {
        const { container } = render(<Backdrop />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it('renders children', () => {
        const text = 'text';
        const { getByText } = render(
            <Backdrop>
                <div>{text}</div>
            </Backdrop>
        );

        const node = getByText(text);

        expect(node).toBeInTheDocument();
    });

    it('applies style prop', () => {
        const color = 'red';

        const { container } = render(<Backdrop style={{ backgroundColor: color }} />);

        expect(container.firstChild).toHaveStyle(`background-color: ${color}`);
    });
});
