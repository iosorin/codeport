import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { BaseLayout } from './Base';
import { BlankLayout } from './Blank';

describe('<BlankLayout />, <AppLayout />', () => {
	it('renders without crashing', () => {
		const { container } = render(
			<MemoryRouter>
				<BlankLayout>
					<BaseLayout />
				</BlankLayout>
			</MemoryRouter>
		);

		expect(container.firstChild).toBeInTheDocument();
		expect(container.firstChild?.firstChild).toBeInTheDocument();
	});

	it('renders childs', () => {
		const text = 'inner text';

		const { getByText } = render(
			<MemoryRouter>
				<BlankLayout>
					<BaseLayout>
						<div>
							<p>{text}</p>
						</div>
					</BaseLayout>
				</BlankLayout>
			</MemoryRouter>
		);

		const node = getByText(text);

		expect(node).toBeInTheDocument();
	});
});
