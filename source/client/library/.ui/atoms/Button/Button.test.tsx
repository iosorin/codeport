import React from 'react';
import { render } from '@testing-library/react';

import { Button } from '.';

describe('<Button />', () => {
	it('renders without crashing', () => {
		const { container } = render(<Button />);

		expect(container.firstChild).toBeInTheDocument();
	});

	it('renders children', () => {
		const text = 'child';

		const { getByText } = render(
			<Button>
				<span>{text}</span>
			</Button>
		);

		const node = getByText(text);

		expect(node).toBeInTheDocument();
	});

	it('renders label', () => {
		const label = 'label';

		const { getByText } = render(<Button label={label} />);

		const node = getByText(label);

		expect(node).toBeInTheDocument();
	});
});
