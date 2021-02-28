import React, { FC } from 'react';

import styles from './tooltip.scss';

export type Props = {
    content?: string | number;
    left?: boolean;
    center?: boolean;
    bottom?: boolean;
    error?: boolean;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
};

export const Tooltip: FC<Props> = ({
    content,
    left,
    center,
    bottom,
    error,
    className = '',
    children,
    disabled,
    ...props
}) => {
    let classlist = [styles.tooltip, className];

    if (left) classlist.push(styles.left);
    if (center) classlist.push(styles.center);
    if (bottom) classlist.push(styles.bottom);
    if (error) classlist.push(styles.error);
    if (disabled) classlist.push('disabled');

    return (
        <div className={classlist.join(' ')} data-tooltip={content} {...props}>
            {children}
        </div>
    );
};
