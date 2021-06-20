import React from 'react';
import { render } from '@testing-library/react';

import { Table } from '.';

const text = 'inner text';

const payload = [
	{
		details: () => <div>{text}</div>,
		rating: 4.5,
	},
	{
		details: () => <div>jsx details</div>,
		rating: 1.5,
	},
];

describe('<Table />', () => {
	it('renders without crashing', () => {
		const { container } = render(<Table payload={payload} />);

		expect(container.firstChild).toBeInTheDocument();
	});

	it('renders children', () => {
		const { getByText } = render(<Table payload={payload} />);

		const node = getByText(text);

		expect(node).toBeInTheDocument();
	});
});
