import React, { FC } from 'react';
import { Droplet } from 'react-feather';
import { Menu } from '../..';
import { Color } from './Color';
import { ColorLine } from './ColorLine';
import styles from './colors.scss';
import { EVENTS_COLORS } from '@/library/constants';

type Props = {
    trigger?: 'button' | 'color' | 'line';
    size?: 'small' | 'medium' | 'large' | 'dot';
    active?: string;
    onChange: (color: string) => Promise<any> | void;
};

export const Colors: FC<Props> = ({
    trigger = false,
    active = EVENTS_COLORS[0],
    size = 'medium',
    onChange,
}) => {
    const isSingle = Boolean(trigger);
    const isActive = (color: string) => color.toLowerCase() === active.toLowerCase();

    const palette = () => {
        return (
            <div className={`${styles.colors} ${isSingle ? styles.outer : ''}`}>
                {EVENTS_COLORS.map((color, index) => (
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
                <div className="hover-opacity-up">
                    <Droplet size="17" color="white" />
                </div>
            );
        }

        if (trigger === 'line') {
            return <ColorLine color={active} />;
        }

        return (
            <div className="hover-opacity-up">
                <Color color={active} size={size} />
            </div>
        );
    };

    return isSingle ? <Menu trigger={openTrigger()}>{palette()}</Menu> : palette();
};
