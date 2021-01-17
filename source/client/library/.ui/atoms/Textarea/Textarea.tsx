import React, { FC, HTMLProps } from 'react';

import styles from './textarea.scss';

type OwnProps = {
    label?: string;
};

type Props = OwnProps & HTMLProps<HTMLTextAreaElement>;

export const Textarea: FC<Props> = ({ label, rows = 4, ...props }) => {
    return (
        <div className={styles.container}>
            {label ? <div className="label">{label}</div> : null}

            <textarea rows={rows} {...props} />
        </div>
    );
};
