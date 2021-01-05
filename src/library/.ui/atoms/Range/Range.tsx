import React, { ChangeEvent, FC, useEffect, useRef } from 'react';

import styles from './range.scss';

type ValueType = number;

export type Props = {
    value: ValueType;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    label?: string;
    disabled?: boolean;
    units?: string;
    onChange: (e: ValueType) => void;
};

export const Range: FC<Props> = ({
    value,
    units = 'px',
    min = 5,
    max = 10,
    step = 1,
    label,
    onChange,
    disabled,
}) => {
    const range = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const changeHandler = (event?: ChangeEvent<HTMLInputElement>) => {
            const newValue = event?.target ? +event.currentTarget.value : value;
            const percent = ((newValue - +min) / (+max - +min)) * 100;

            if (range.current) {
                range.current.style.setProperty('--progressPercent', `${percent}%`);
            }

            onChange(newValue);
        };

        changeHandler();
    }, [value, max, min, onChange]);

    return (
        <div className={styles.container}>
            {label ? <div className="label">{label}</div> : null}

            <div className="flex-center">
                <b className={styles.value}>
                    {value}
                    {units}
                </b>
                <input
                    ref={range}
                    className={styles.range}
                    disabled={disabled}
                    max={max}
                    min={min}
                    onChange={(e) => onChange(+e.currentTarget.value)}
                    step={step}
                    type="range"
                    value={value}
                />
            </div>
        </div>
    );
};
