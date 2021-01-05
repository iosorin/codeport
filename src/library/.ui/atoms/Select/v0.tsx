import { useOutsideClick } from '@hooks';
import React, { FC, useState } from 'react';
import { ChevronDown } from 'react-feather';

import styles from './select.scss';

export type OptionType = string | { name?: string; value?: string };

export type Props = {
    label?: string;
    value?: OptionType;
    options: OptionType[];
    onChange: (value: OptionType) => void;
};

export const Select: FC<Props> = ({ label, value = '', options = [], onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectHandler = (selected: OptionType) => {
        onChange(selected);
        setIsOpen(false);
    };

    const [ref] = useOutsideClick(() => setIsOpen(false));

    const getValue = (option: OptionType): string => {
        if (!option) return '';

        return typeof option === 'string' ? option : option.value || option.name || '';
    };

    const getName = (option: OptionType) => {
        return typeof option === 'string' ? option : option.name || option.value;
    };

    return (
        <div ref={ref} className={`${styles.select} ${isOpen ? styles.isOpen : ''}`}>
            {label ? <div className="label">{label}</div> : null}
            <div className={styles.value} onClick={() => setIsOpen(!isOpen)}>
                <span>{getValue(value)}</span>

                <span className={`append ${styles.chevron}`}>
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
                        {getName(option)}
                    </li>
                ))}
            </ul>
        </div>
    );
};
