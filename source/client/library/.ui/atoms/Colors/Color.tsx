import React, { FC } from 'react';
import styles from './colors.scss';

type Props = {
    color: string;
    active?: boolean;
    onClick?: false | ((color: string) => void);
    size?: 'small' | 'medium' | 'large';
};

export const Color: FC<Props> = ({ color, active, size = 'medium', onClick }) => {
    return (
        <div
            style={{ background: color }}
            className={`${styles.color} ${styles[size]} ${active ? styles.active : ''}`}
            onClick={() => onClick && onClick(color)}
        ></div>
    );
};
