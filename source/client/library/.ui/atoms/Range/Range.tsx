import React, { ChangeEvent, FC, useEffect, useRef } from 'react';

import styles from './range.scss';

export type Props = {
    value: number | undefined;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    label?: string;
    disabled?: boolean;
    dark?: boolean;
    units?: string;
    onChange: (e: number) => void;
};

export const Range: FC<Props> = ({
    value = 0,
    units = 'px',
    min = 5,
    max = 10,
    step = 1,
    label,
    dark,
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
    }, [value]);

    return (
        <div className={`${styles.container} ${dark ? styles.dark : ''}`}>
            {label ? <div className="label mb-0">{label}</div> : null}

            <div className="flex-row-reverse align-center">
                <small className={styles.value}>
                    <b>
                        {value}
                        {units}
                    </b>
                </small>

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
