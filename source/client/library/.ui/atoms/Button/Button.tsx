import React, { CSSProperties } from 'react';
import { Loader } from '../Loader';

import styles from './button.scss';

export type Props = {
    type?: 'button' | 'submit';
    label?: string;
    size?: 'small' | 'medium' | 'large';
    color?: 'white' | 'black';
    hover?: boolean;
    background?: 'primary' | 'secondary' | 'success' | 'light';
    shadow?: 'dark' | 'light';
    rounded?: boolean;
    outline?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
};

export const Button: React.FC<Props> = ({
    type = 'button',
    size = 'medium',
    background = 'secondary',
    color = 'white',
    shadow,
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
    if (shadow) classlist.push(styles[`shadow-${shadow}`]);
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
            type={type}
            disabled={disabled}
        >
            {loading ? <Loader type="dots" dur="1s" /> : <span>{content}</span>}
        </button>
    );
};
