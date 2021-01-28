import { cleanup, render } from '@testing-library/react';
import React from 'react';

import { Dialog } from '.';

const text = 'dialog content';
const title = 'dialog title';

jest.mock('react-transition-group/CSSTransition', () => {
    const FakeTransition = jest.fn(({ children }) => children);
    const FakeCSSTransition = jest.fn((props) =>
        props.in ? <FakeTransition>{props.children}</FakeTransition> : null
    );

    return FakeCSSTransition;
});

const dialog = (isVisible: boolean) => {
    return (
        <Dialog close={() => {}} isVisible={isVisible} persistent title={title}>
            {text}
        </Dialog>
    );
};

afterEach(cleanup);

describe('<Dialog />', () => {
    it('renders children and title prop', () => {
        const { getByText } = render(dialog(true));

        expect(getByText(text)).toBeInTheDocument();
        expect(getByText(title)).toBeInTheDocument();
    });

    it('dialog toggle', () => {
        const { rerender, queryByText } = render(dialog(true));

        expect(queryByText(text)).not.toBeNull();

        rerender(dialog(false));

        expect(queryByText(text)).toBeNull();
    });
});
