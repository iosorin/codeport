import React, { FC } from 'react';

import styles from './styles.scss';

export const BlankLayout: FC = ({ children }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.inner}>{children}</div>
        </div>
    );
};
