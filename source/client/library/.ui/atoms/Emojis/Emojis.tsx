import React, { FC } from 'react';
import { standard } from './preset';
import styles from './emojis.scss';

type Props = {
    value?: number | string;
    label?: string;
    size?: 'small' | 'medium' | 'large';
    onChange: (e: number) => void;
};

export const Emojis: FC<Props> = ({ value, label, size = 'small', onChange }) => {
    return (
        <div className={styles.container}>
            {label ? <div className="label mb-xs">{label}</div> : null}

            <ul>
                {standard.map((emoji) => (
                    <li
                        key={emoji.value}
                        className={`${styles.emoji} ${styles[size]} ${
                            emoji.value == value ? styles.active : ''
                        }`}
                        onClick={() => onChange(emoji.value)}
                    >
                        {emoji.icon}
                    </li>
                ))}
            </ul>
        </div>
    );
};
