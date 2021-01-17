import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Tooltip } from '.';

const innerText = 'tooltip children text';
const tooltipText = 'Tooltip';

afterEach(cleanup);

describe('<Tooltip />', () => {
    it('renders without crashing', () => {
        const { container } = render(<Tooltip content={tooltipText}>{innerText}</Tooltip>);

        expect(container.firstChild).toBeInTheDocument();
    });

    it('renders children', () => {
        const { getByText } = render(<Tooltip content={tooltipText}>{innerText}</Tooltip>);

        const node = getByText(innerText);

        expect(node).toBeInTheDocument();
    });

    it('inserts "content" prop at html markup', () => {
        const { container } = render(<Tooltip content={tooltipText}>{innerText}</Tooltip>);

        expect(container.outerHTML.includes(tooltipText)).toBeTruthy();
    });
});
