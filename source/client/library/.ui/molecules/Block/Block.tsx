import React, { FC, memo } from 'react';
import { Edit, X } from 'react-feather';
import { Button } from '../../atoms';
import styles from './block.scss';

export type Props = {
    title?: string;
    icon?: string | JSX.Element;
    small?: string | number;
    size?: 'small' | 'medium' | 'large';
    background?: 'light' | 'grey' | 'dark' | 'black' | 'primary' | 'success' | 'yellow' | 'none';
    color?: 'black' | 'white';
    customBackground?: string;
    p0?: boolean;
    flex?: boolean;
    hover?: boolean;
    styled?: boolean;
    controlsInBottom?: boolean;
    height?: string;
    onEdit?: () => void;
    onRemove?: () => void;
    onClick?: () => void;
};

export const Block: FC<Props> = memo(
    ({
        title,
        size = 'medium',
        customBackground,
        background = 'dark',
        color = customBackground ? 'black' : 'white',
        height: minHeight = '',
        icon,
        small,
        p0,
        flex,
        hover,
        styled,
        controlsInBottom,
        onEdit,
        onRemove,
        onClick,
        children,
    }) => {
        const classlist = [
            styles.block,
            styles[size],
            styles[`color-${color}`],
            styles[background],
        ];

        if (flex) classlist.push(styles.flex);
        if (hover || onClick) classlist.push(styles.hover);
        if (styled) classlist.push(styles.styled);
        if (p0) classlist.push(styles.p0);

        const controls = (
            <div className={styles.controls}>
                {onEdit && (
                    <Button
                        rounded
                        hover
                        background="grey"
                        onClick={onEdit}
                        color={background === ('light' || 'yellow') ? 'black' : 'white'}
                    >
                        <Edit size="15" />
                    </Button>
                )}

                {onRemove && (
                    <Button
                        rounded
                        hover
                        background="grey"
                        onClick={onRemove}
                        color={background === ('light' || 'yellow') ? 'black' : 'white'}
                    >
                        <X size="17" />
                    </Button>
                )}
            </div>
        );

        return (
            <div
                className={classlist.join(' ')}
                style={{ minHeight, background: customBackground || '' }}
                onClick={onClick}
            >
                {(title || onEdit || onRemove) && (
                    <div className={styles.header}>
                        {title && <h3>{title}</h3>}

                        {!controlsInBottom && controls}
                    </div>
                )}

                <div className={styles.content}>{children}</div>

                {(icon || small || controlsInBottom) && (
                    <div className={styles.footer}>
                        {icon && <span>{icon}</span>}
                        {small && <small>{small}</small>}

                        {controlsInBottom && controls}
                    </div>
                )}
            </div>
        );
    }
);
