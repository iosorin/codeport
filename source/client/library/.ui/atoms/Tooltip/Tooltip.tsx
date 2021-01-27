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
};

export const Tooltip: FC<Props> = ({
    content,
    left,
    center,
    bottom,
    error,
    className = '',
    children,
    ...props
}) => {
    let classlist = [styles.tooltip, className];

    if (left) classlist.push(styles.left);
    if (center) classlist.push(styles.center);
    if (bottom) classlist.push(styles.bottom);
    if (error) classlist.push(styles.error);

    return (
        <div className={classlist.join(' ')} data-tooltip={content} {...props}>
            {children}
        </div>
    );
};
