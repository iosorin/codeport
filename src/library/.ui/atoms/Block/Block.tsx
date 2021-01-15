import React, { FC } from 'react';
import styles from './block.scss';

export type Props = {
    title?: string;
    icon?: string;
    small?: string;
    size?: 'small' | 'medium' | 'large';
    background?: 'light' | 'dark' | 'primary' | 'success';
    stretch?: boolean;
};

export const Block: FC<Props> = ({
    title,
    size = 'medium',
    background = 'dark',
    stretch,
    icon,
    small,
    children,
}) => {
    const classlist = [styles.block, styles[size], styles[background]];

    if (stretch) classlist.push(styles.stretch);

    return (
        <div className={classlist.join(' ')}>
            {title && <h3 className={styles.title}>{title}</h3>}

            {children}

            <div className={styles.footer}>
                {icon && <span>{icon}</span>}
                {small && <small>{small}</small>}
            </div>
        </div>
    );
};
