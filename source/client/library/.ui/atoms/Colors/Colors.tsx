import React, { FC } from 'react';
import { Color } from './Color';
import styles from './colors.scss';

const colors = ['#6c67f4', '#ecfa1c', '#ff6150', '#3ee97f'];

type Props = {
    label?: string;
    active?: string;
    onChange: (color: string) => void;
};

export const Colors: FC<Props> = ({ label, active = colors[0], onChange }) => {
    const isActive = (color: string) => color.toLowerCase() === active.toLowerCase();

    return (
        <div className={styles.colors}>
            {label ? <div className="label">{label}</div> : null}

            {colors.map((color, index) => (
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
