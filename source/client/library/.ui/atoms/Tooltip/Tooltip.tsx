import React, { FC, useState } from 'react';

import styles from './tooltip.scss';

export type Props = {
    text: string | [string, string];
    textDone?: string;
    left?: boolean;
    center?: boolean;
    bottom?: boolean;
    error?: boolean;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
};

export const Tooltip: FC<Props> = ({
    text,
    textDone,
    left,
    center,
    bottom,
    error,
    className = '',
    children,
    disabled,
    onClick,
}) => {
    const [content, setContent] = useState(text);

    let classlist = [styles.tooltip, className];

    if (left) classlist.push(styles.left);
    if (center) classlist.push(styles.center);
    if (bottom) classlist.push(styles.bottom);
    if (error) classlist.push(styles.error);
    if (disabled) classlist.push('disabled');

    const handleClick = () => {
        if (!onClick) return;

        onClick();

        if (textDone) {
            setContent(textDone);

            setTimeout(() => {
                setContent(text);
            }, 800);
        }
    };

    return (
        <div className={classlist.join(' ')} data-tooltip={content} onClick={handleClick}>
            {children}
        </div>
    );
};
