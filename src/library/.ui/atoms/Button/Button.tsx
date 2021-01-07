import React, { CSSProperties } from 'react';
import { Loader } from '../Loader';

import styles from './button.scss';

export type Props = {
    label?: string;
    primary?: boolean;
    success?: boolean;
    background?: string;
    size?: 'small' | 'medium' | 'large';
    rounded?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
};

export const Button: React.FC<Props> = ({
    primary = false,
    size = 'medium',
    label,
    rounded,
    loading,
    disabled,
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
            {loading ? <Loader type="spinner" dur="0.8s" /> : content}
        </button>
    );
};
