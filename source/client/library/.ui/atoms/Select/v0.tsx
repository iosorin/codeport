import React, { FC, useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useOutsideClick } from '@hooks';
import styles from './select.scss';

export type OptionType = string | { name?: string; value?: string };

export type Props = {
    label?: string;
    value?: OptionType;
    options: OptionType[];
    onChange: (value: OptionType) => void;
};

export const Select: FC<Props> = ({ label, value = '', options = [], onChange }) => {
    const [open, setOpen] = useState(false);

    const selectHandler = (selected: OptionType) => {
        onChange(selected);
        setOpen(false);
    };

    const [ref] = useOutsideClick(() => setOpen(false));

    const getValue = (option: OptionType): string => {
        if (!option) return '';

        return typeof option === 'string' ? option : option.value || option.name || '';
    };

    const getName = (option: OptionType) => {
        return typeof option === 'string' ? option : option.name || option.value;
    };

    return (
        <div ref={ref} className={`${styles.select} ${open ? styles.isOpen : ''}`}>
            {label ? <div className="label">{label}</div> : null}
            <div className={styles.value} onClick={() => setOpen(!open)}>
                <span>{getValue(value)}</span>

                <span className={`append ${styles.chevron}`}>
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
                        {getName(option)}
                    </li>
                ))}
            </ul>
        </div>
    );
};
