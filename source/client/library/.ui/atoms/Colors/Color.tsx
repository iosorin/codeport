import React, { FC } from 'react';
import styles from './color.scss';

type Props = {
    color: string;
    active?: boolean;
    onClick?: (color: string) => void;
    size?: 'small' | 'medium' | 'large';
};

export const Color: FC<Props> = ({ color, active, size = 'medium', onClick }) => {
    return (
        <div
            style={{ background: color }}
            className={`${styles.color} ${styles[size]} ${active ? styles.active : ''} ${
                onClick ? styles.selectable : ''
            }`}
            onClick={() => onClick?.(color)}
        ></div>
    );
};
