import React, { FC, memo } from 'react';
import { Edit3, X } from 'react-feather';
import { Button } from '../../atoms';
import styles from './block.scss';

export type Props = {
    title?: string;
    icon?: string | JSX.Element;
    small?: string | number;
    size?: 'small' | 'medium' | 'large';
    background?: 'light' | 'dark' | 'black' | 'primary' | 'success' | 'yellow' | 'none';
    customBackground?: string;
    flex?: boolean;
    hover?: boolean;
    styled?: boolean;
    empty?: boolean;
    controlsInBottom?: boolean;
    height?: string;
    onEdit?: false | (() => void);
    onRemove?: false | (() => void);
};

export const Block: FC<Props> = memo(
    ({
        title,
        size = 'medium',
        customBackground,
        background = 'dark',
        height: minHeight = '',
        icon,
        small,
        flex,
        hover,
        styled,
        empty,
        controlsInBottom,
        onEdit,
        onRemove,
        children,
    }) => {
        const classlist = [styles.block, styles[size], styles[background]];

        if (flex) classlist.push(styles.flex);
        if (hover) classlist.push(styles.hover);
        if (empty) classlist.push(styles.empty);
        if (styled) classlist.push(styles.styled);

        const controls = (
            <div className={styles.controls}>
                {onEdit && (
                    <Button
                        rounded
                        outline
                        hover
                        size="small"
                        onClick={onEdit}
                        color={background === ('light' || 'yellow') ? 'black' : 'white'}
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
