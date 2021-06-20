import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { Sidebar } from 'react-feather';

afterEach(() => {
	cleanup();
});

describe('<Sidebar />', () => {
	it('renders without crashing', () => {
		const { container } = render(<Sidebar />);

		expect(container.firstChild).toBeInTheDocument();
	});
});
