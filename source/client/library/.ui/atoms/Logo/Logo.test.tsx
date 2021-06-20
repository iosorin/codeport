import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Logo } from '.';

const title = String(process.env.TITLE);

afterEach(cleanup);

describe('<Logo/>', () => {
	it('renders without crashing', () => {
		const { container } = render(<Logo />);

		expect(container.firstChild).toBeInTheDocument();
	});

	it('renders default version', () => {
		const { getByText } = render(<Logo short={false} />);

		expect(getByText(title)).toBeInTheDocument();
	});

	it('renders short version', () => {
		const { queryByText } = render(<Logo short />);

		expect(queryByText(title)).toBeNull();
	});
});
