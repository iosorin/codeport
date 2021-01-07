import React, { FC, HTMLProps, useState } from 'react';
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
    const [isOpen, setIsOpen] = useState(false);

    const selectHandler = (selected: ValueType) => {
        onChange(selected);
        setIsOpen(false);
    };

    const [ref] = useOutsideClick(() => setIsOpen(false));

    const getValue = (e: OptionType): string => {
        return typeof e === 'string' ? e : e.value;
    };

    const getTitle = (e: OptionType) => {
        return typeof e === 'string' ? e : e.title || e.value;
    };

    return (
        <div
            ref={ref}
            className={`${styles.select} ${isOpen ? styles.isOpen : ''}`}
            tabIndex={tabIndex}
        >
            {label ? <div className="label">{label}</div> : null}
            <div className={styles.value} onClick={() => setIsOpen(!isOpen)}>
                <span>{getTitle(value)}</span>

                <span className="append">
                    <ChevronDown size="16" />
                </span>
            </div>

            <ul className={`${styles.options} ${isOpen ? styles.visible : ''}`}>
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
