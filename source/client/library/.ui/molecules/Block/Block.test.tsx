import React from 'react';
import { render } from '@testing-library/react';

import { Block } from '.';

describe('<Block />', () => {
	it('renders without crashing', () => {
		const { container } = render(<Block />);

		expect(container.firstChild).toBeInTheDocument();
	});

	it('renders children', () => {
		const text = 'child';

		const { getByText } = render(
			<Block>
				<span>{text}</span>
			</Block>
		);

		const node = getByText(text);

		expect(node).toBeInTheDocument();
	});
});
