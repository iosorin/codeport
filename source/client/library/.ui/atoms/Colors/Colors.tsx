import React, { FC } from 'react';
import { Droplet } from 'react-feather';
import { Button, Menu } from '../..';
import { Color } from './Color';
import presets from './presets';
import styles from './colors.scss';

type Props = {
    type?: 'palette' | 'single';
    trigger?: 'button' | 'color';
    size?: 'small' | 'medium' | 'large';
    label?: string;
    active?: string;
    preset?: 'standard' | 'mini';
    onChange: (color: string) => void;
};

export const Colors: FC<Props> = ({
    type = 'palette',
    trigger = 'color',
    label,
    preset = 'mini',
    active = preset[0],
    size = 'medium',
    onChange,
}) => {
    const isPalette = type === 'palette';

    const isActive = (color: string) => color.toLowerCase() === active.toLowerCase();

    const palette = () => {
        return (
            <div className={`${styles.colors} ${isPalette ? '' : styles.outer}`}>
                {presets[preset].map((color, index) => (
                    <Color
                        key={index}
                        active={isActive(color)}
                        size={size}
                        color={color}
                        onClick={onChange}
                    />
                ))}
            </div>
        );
    };

    const button = () => {
        return trigger === 'button' ? (
            <Button rounded hover size="small" background="light">
                <Droplet size="20" />
            </Button>
        ) : (
            <Color color={active} size={size} />
        );
    };

    return (
        <div className={styles.container}>
            {label ? <div className="label mr-1">{label}</div> : null}

            {isPalette ? palette() : <Menu trigger={button()}>{palette()}</Menu>}
        </div>
    );
};
