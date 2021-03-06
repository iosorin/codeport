import React, { FC, useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useOutsideClick } from '@hooks';

import styles from './select.scss';

type ValueType = any;
export type OptionType = { title?: string; value: ValueType } | ValueType;

export type Props = {
    label?: string;
    value?: ValueType;
    options: OptionType[];
    tabIndex?: number | undefined;
    onChange: (value: ValueType) => void;
};

export const Select: FC<Props> = ({ label, value = '', options = [], tabIndex, onChange }) => {
    const [open, setOpen] = useState(false);

    const selectHandler = (selected: ValueType) => {
        onChange(selected);
        setOpen(false);
    };

    const [ref] = useOutsideClick(() => setOpen(false));

    const getValue = (e: OptionType): string => {
        return typeof e === 'string' ? e : e.value;
    };

    const getTitle = (e: OptionType) => {
        return typeof e === 'string' ? e : e.title || e.value;
    };

    return (
        <div
            ref={ref}
            className={`${styles.select} ${open ? styles.isOpen : ''}`}
            tabIndex={tabIndex}
        >
            {label ? <div className="label">{label}</div> : null}
            <div className={styles.value} onClick={() => setOpen(!open)}>
                <span>{getTitle(value)}</span>

                <span className="append">
                    <ChevronDown size="16" />
                </span>
            </div>

            <ul className={`${styles.options} ${open ? styles.visible : ''}`}>
                {options.map((option) => (
                    <li
                        key={getValue(option)}
                        aria-selected={getValue(option) === value}
                        className={`${styles.option} ${
                            getValue(option) === value ? styles.active : ''
                        }`}
                        onClick={() => selectHandler(option)}
                        role="option"
                    >
                        {getTitle(option)}
                    </li>
                ))}
            </ul>
        </div>
    );
};
