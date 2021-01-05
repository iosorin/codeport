import React from 'react';
import { cleanup, render } from '@testing-library/react';
import CSSTransition from 'react-transition-group/CSSTransition';

import { Transition, DEFAULT_DURATION } from '.';

jest.mock('react-transition-group/CSSTransition', () => {
    return jest.fn(() => null);
});

afterEach(cleanup);

const expectedCSSTransitionProps = {
    timeout: DEFAULT_DURATION,
    classNames: 'fade',
    appear: true,
    unmountOnExit: true,
    mountOnEnter: true,
    nodeRef: expect.any(Object),
    children: expect.any(Object),
};

const transition = (inProp: boolean) => {
    return (
        <Transition in={inProp}>
            <p>child</p>
        </Transition>
    );
};

describe('<Transition />', () => {
    it('renders without crashing', () => {
        const { rerender } = render(transition(true));

        const context = expect.any(Object);

        expect(CSSTransition).toHaveBeenCalledWith(
            { in: true, ...expectedCSSTransitionProps },
            context
        );

        rerender(transition(false));

        expect(CSSTransition).toHaveBeenCalledWith(
            { in: false, ...expectedCSSTransitionProps },
            expect.any(Object)
        );
    });
});
