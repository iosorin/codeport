import React, { FC } from 'react';
import { Color } from './Color';

const colors = ['#edf6f9', '#6c67f4', '#ecfa1c', '#ff6150', '#3ee97f', '#4E5B6C'];

type Props = {
    active: string;
    onChange: (color: string) => void;
};

export const Colors: FC<Props> = ({ active, onChange }) => {
    const isActive = (color: string) => color.toLowerCase() === active.toLowerCase();

    return (
        <div className="flex">
            {colors.map((color, index) => (
                <Color key={index} active={isActive(color)} color={color} onClick={onChange} />
            ))}
        </div>
    );
};
