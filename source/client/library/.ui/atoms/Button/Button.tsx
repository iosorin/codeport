import React, { CSSProperties } from 'react';
import { Loader } from '../Loader';

import styles from './button.scss';

export type Props = {
    label?: string;
    hover?: boolean;
    background?: 'primary' | 'secondary' | 'success' | 'light';
    size?: 'small' | 'medium' | 'large';
    color?: 'white' | 'black';
    rounded?: boolean;
    outline?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
};

export const Button: React.FC<Props> = ({
    size = 'medium',
    background = 'secondary',
    color = 'white',
    label,
    rounded,
    outline,
    hover,
    loading,
    disabled,
    children,
    className = '',
    style,
    onClick,
}) => {
    const classlist = [styles.button, styles[size], styles[background], styles[color], className];

    if (hover) classlist.push(styles.hover);
    if (rounded) classlist.push(styles.rounded);
    if (outline) classlist.push(styles.outline);
    if (loading) classlist.push(styles.loading);

    const content = (
        <>
            {label && <span>{label}</span>}
            {children}
        </>
    );
    return (
        <button
            className={classlist.join(' ')}
            onClick={onClick}
            style={{ backgroundColor: background, ...style }}
            type="button"
            disabled={disabled}
        >
            {loading ? <Loader type="dots" dur="1s" /> : content}
        </button>
    );
};
