import React, { FC } from 'react';
import { Droplet } from 'react-feather';
import { Button, Menu } from '../..';
import { Color } from './Color';
import presets from './presets';
import styles from './colors.scss';

type Props = {
    type?: 'palette' | 'button';
    trigger?: JSX.Element;
    label?: string;
    active?: string;
    preset?: 'standard' | 'mini';
    onChange: (color: string) => void;
};

export const Colors: FC<Props> = ({
    type = 'palette',
    trigger,
    label,
    preset = 'standard',
    active = preset[0],
    onChange,
}) => {
    const isPalette = type === 'palette';

    const isActive = (color: string) => color.toLowerCase() === active.toLowerCase();

    const palette = () => {
        return (
            <div className={`${styles.colors} ${isPalette ? '' : styles.outer}`}>
                {label ? <div className="label mr-1">{label}</div> : null}

                {presets[preset].map((color, index) => (
                    <Color
                        key={index}
                        active={isActive(color)}
                        color={color}
                        onClick={onChange}
                        size="large"
                    />
                ))}
            </div>
        );
    };

    const button = () => {
        return (
            trigger || (
                <Button rounded hover size="small" background="light">
                    <Droplet size="20" />
                </Button>
            )
        );
    };

    return isPalette ? palette() : <Menu trigger={button()}>{palette()}</Menu>;
};
