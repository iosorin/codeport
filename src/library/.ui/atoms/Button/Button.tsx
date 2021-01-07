import React, { CSSProperties } from 'react';

import styles from './button.scss';

export type Props = {
    label?: string;
    primary?: boolean;
    success?: boolean;
    background?: string;
    size?: 'small' | 'medium' | 'large';
    rounded?: boolean;

    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
};

export const Button: React.FC<Props> = ({
    primary = false,
    size = 'medium',
    label,
    rounded,
    success,
    children,
    background,
    className = '',
    style,
    onClick,
}) => {
    // eslint-disable-next-line no-nested-ternary
    const mode = success ? styles.success : primary ? styles.primary : styles.secondary;
    const classlist = [styles.button, styles[size], mode, className];

    if (rounded) {
        classlist.push(styles.rounded);
    }

    return (
        <button
            className={classlist.join(' ')}
            onClick={onClick}
            style={{ backgroundColor: background, ...style }}
            type="button"
        >
            {label && <span>{label}</span>}

            {children}
        </button>
    );
};
