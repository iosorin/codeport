import React, { FC } from 'react';
import { Edit3, X } from 'react-feather';
import { Button } from '../../atoms';
import styles from './block.scss';

export type Props = {
    title?: string;
    icon?: string;
    small?: string | number;
    size?: 'small' | 'medium' | 'large';
    background?: 'light' | 'dark' | 'primary' | 'success' | 'yellow';
    stretch?: boolean;
    square?: boolean;
    outline?: boolean;
    styled?: boolean;
    controlsInBottom?: boolean;
    height?: string;
    onEdit?: () => void;
    onRemove?: () => void;
};

export const Block: FC<Props> = ({
    title,
    size = 'medium',
    background = 'dark',
    height: minHeight = '',
    icon,
    small,
    stretch,
    square,
    outline,
    styled,
    controlsInBottom,
    onEdit,
    onRemove,
    children,
}) => {
    const classlist = [styles.block, styles[size], styles[background]];

    if (styled) classlist.push(styles.styled);
    if (stretch) classlist.push(styles.stretch);
    if (square) classlist.push(styles.square);
    if (outline) classlist.push(styles.outline);

    const controls = (
        <div className={styles.controls}>
            {onEdit && (
                <Button
                    rounded
                    outline
                    hover
                    size="small"
                    onClick={onEdit}
                    color={background === 'light' ? 'black' : 'white'}
                >
                    <Edit3 size="15" />
                </Button>
            )}

            {onRemove && (
                <Button
                    rounded
                    outline
                    hover
                    size="small"
                    onClick={onRemove}
                    color={background === 'light' ? 'black' : 'white'}
                >
                    <X size="17" />
                </Button>
            )}
        </div>
    );

    return (
        <div className={classlist.join(' ')} style={{ minHeight }}>
            {(title || onEdit || onRemove) && (
                <div className={styles.header}>
                    {title && <h3>{title}</h3>}

                    {!controlsInBottom && controls}
                </div>
            )}

            <div className={styles.content}>{children}</div>

            <div className={styles.footer}>
                {icon && <span>{icon}</span>}
                {small && <small>{small}</small>}

                {controlsInBottom && controls}
            </div>
        </div>
    );
};
