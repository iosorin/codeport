import React, { cloneElement, useRef, FC, ReactElement } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import './transition.shared.scss';

export const DEFAULT_DURATION = 300;

export type Transition =
    | 'fade'
    | 'zoom'
    | 'slide-fade-up'
    | 'slide-fade-left'
    | 'slide-in-left'
    | 'call-panel-slide';

export type Props = {
    type?: Transition;
    in: boolean | undefined | number;
    duration?: number | string;
    className?: string;
    children: ReactElement;
};

export const Transition: FC<Props> = ({
    type = 'fade',
    duration = DEFAULT_DURATION,
    in: inProp,
    children,
    ...props
}) => {
    const ref = useRef();

    return (
        <CSSTransition
            appear
            classNames={type}
            in={Boolean(inProp)}
            mountOnEnter
            nodeRef={ref}
            timeout={+duration}
            unmountOnExit
            {...props}
        >
            {cloneElement(children, {
                style: {
                    ...children.props.style,
                    transitionDuration: `${duration}ms`,
                },
                ref,
            })}
        </CSSTransition>
    );
};
