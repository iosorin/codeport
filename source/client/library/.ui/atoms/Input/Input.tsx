import React, { FC, HTMLProps } from 'react';
import styles from './input.scss';

type OwnProps = {
    label?: string;
    append?: string | number;
    dark?: boolean;
};

type Props = OwnProps & HTMLProps<HTMLInputElement>;

export const Input: FC<Props> = ({ type = 'text', value, dark, label, append, ...props }) => {
    return (
        <div className={`${styles.container} ${dark ? styles.dark : ''}`}>
            {label ? <div className="label">{label}</div> : null}

            <input {...props} type={type} value={value || ''} />

            {append ? <div className="append">{append}</div> : null}
        </div>
    );
};
