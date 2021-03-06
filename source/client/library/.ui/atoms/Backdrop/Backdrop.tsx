import React, { CSSProperties, FC, MouseEvent } from 'react';
import { Transition } from '../Transition';
import styles from './backdrop.scss';

export const DEFAULT_MS = 380;

export type Props = {
    style?: CSSProperties;
    visible?: boolean;
    onClick?: (e: MouseEvent) => void;
    msToShow?: number;
};

export const Backdrop: FC<Props> = ({
    style = {},
    visible = true,
    children,
    msToShow = DEFAULT_MS,
    onClick = () => {},
}) => {
    return (
        <Transition duration={msToShow} in={visible} type="fade">
            <div className={styles.Backdrop} onClick={onClick} style={{ ...style }}>
                {children}
            </div>
        </Transition>
    );
};
