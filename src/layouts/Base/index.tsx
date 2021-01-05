import React, { FC } from 'react';
import { Sidebar } from '@ui';
import { BlankLayout } from '@layouts';

import styles from './styles.scss';

export const BaseLayout: FC = ({ children }) => {
    return (
        <BlankLayout>
            <Sidebar className={styles.sidebar} />

            <div className={styles.content}>{children}</div>
        </BlankLayout>
    );
};
