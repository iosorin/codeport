import React, { FC } from 'react';

import styles from './tooltip.scss';

export type Props = {
    content?: string;
    left?: boolean;
    bottom?: boolean;
    error?: boolean;
    className?: string;
    onClick?: () => void;
};

export const Tooltip: FC<Props> = ({
    content,
    left,
    bottom,
    error,
    className = '',
    children,
    ...props
}) => {
    let classlist = [styles.tooltip, className];

    if (left) classlist.push(styles.left);
    if (bottom) classlist.push(styles.bottom);
    if (error) classlist.push(styles.error);

    return (
        <div className={classlist.join(' ')} data-tooltip={content} {...props}>
            {children}
        </div>
    );
};
