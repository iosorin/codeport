import React, { FC } from 'react';
import { Droplet } from 'react-feather';
import { Menu } from '../..';
import { Color } from './Color';
import { ColorLine } from './ColorLine';
import presets from './presets';
import styles from './colors.scss';

type Props = {
    trigger?: 'button' | 'color' | 'line';
    size?: 'small' | 'medium' | 'large' | 'dot';
    active?: string;
    preset?: 'standard' | 'mini';
    onChange: (color: string) => Promise<any> | void;
};

export const Colors: FC<Props> = ({
    trigger = false,
    preset = 'standard',
    active = preset[0],
    size = 'medium',
    onChange,
}) => {
    const isSingle = Boolean(trigger);
    const isActive = (color: string) => color.toLowerCase() === active.toLowerCase();

    const palette = () => {
        return (
            <div className={`${styles.colors} ${isSingle ? styles.outer : ''}`}>
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

    const openTrigger = () => {
        if (trigger === 'button') {
            return (
                <div className="hoverable">
                    <Droplet size="17" color="white" />
                </div>
            );
        }

        if (trigger === 'line') {
            return <ColorLine color={active} />;
        }

        return (
            <div className="hoverable">
                <Color color={active} size={size} />
            </div>
        );
    };

    return isSingle ? <Menu trigger={openTrigger()}>{palette()}</Menu> : palette();
};
