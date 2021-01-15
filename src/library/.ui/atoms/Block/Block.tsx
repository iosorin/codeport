import React, { FC } from 'react';
import { Edit2, Edit3 } from 'react-feather';
import { Button } from '../Button';
import styles from './block.scss';

export type Props = {
    title?: string;
    icon?: string;
    small?: string;
    size?: 'small' | 'medium' | 'large';
    background?: 'light' | 'dark' | 'primary' | 'success';
    stretch?: boolean;
    square?: boolean;
    outline?: boolean;
    styled?: boolean;
    onEdit?: () => void;
};

export const Block: FC<Props> = ({
    title,
    size = 'medium',
    background = 'dark',
    icon,
    small,
    stretch,
    square,
    outline,
    styled,
    onEdit,
    children,
}) => {
    const classlist = [styles.block, styles[size], styles[background]];

    if (styled) classlist.push(styles.styled);
    if (stretch) classlist.push(styles.stretch);
    if (square) classlist.push(styles.square);
    if (outline) classlist.push(styles.outline);

    return (
        <div className={classlist.join(' ')}>
            {(title || onEdit) && (
                <div className={styles.header}>
                    {title && <h3>{title}</h3>}

                    {onEdit && (
                        <Button rounded hover size="small" onClick={onEdit}>
                            <Edit3 size="15" />
                        </Button>
                    )}
                </div>
            )}

            {children}

            <div className={styles.footer}>
                {icon && <span>{icon}</span>}
                {small && <small>{small}</small>}
            </div>
        </div>
    );
};
