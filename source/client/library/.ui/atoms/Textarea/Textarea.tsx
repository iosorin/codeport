import React, { FC, HTMLProps } from 'react';

import styles from './textarea.scss';

type OwnProps = {
    label?: string;
    dark?: boolean;
};

type Props = OwnProps & HTMLProps<HTMLTextAreaElement>;

export const Textarea: FC<Props> = ({ label, dark, rows = 3, ...props }) => {
    return (
        <div className={`${styles.container} ${dark ? styles.dark : ''}`}>
            {label ? <div className="label">{label}</div> : null}

            <textarea rows={rows} {...props} />
        </div>
    );
};
