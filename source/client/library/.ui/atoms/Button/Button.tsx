import React, { CSSProperties } from 'react';
import { Loader } from '../Loader';

import styles from './button.scss';

export type Props = {
    type?: 'button' | 'submit';
    label?: string;
    size?: 'small' | 'medium' | 'large';
    color?: 'white' | 'black';
    hover?: boolean;
    background?: 'primary' | 'secondary' | 'success' | 'light' | 'grey' | 'dark';
    shadow?: 'dark' | 'light' | false;
    zoom?: boolean;
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
    zoom,
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

    if (zoom) classlist.push(styles.zoom);
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
            style={{ ...style }}
            type={type}
            disabled={disabled}
        >
            {loading ? (
                <Loader type="dots" dur="1s" color={color} />
            ) : (
                <span className={loading ? 'invisible' : ''}>{content}</span>
            )}
        </button>
    );
};
