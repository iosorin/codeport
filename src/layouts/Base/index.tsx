import React, { FC } from 'react';
import { Observer } from 'mobx-react-lite';
import { Sidebar } from '@/router/Sidebar';
import { BlankLayout } from '@layouts';
import { useCore } from '@/core';
import styles from './styles.scss';

export const BaseLayout: FC = ({ children }) => {
    const { ui } = useCore();

    return (
        <BlankLayout>
            <Observer>
                {() => <Sidebar className={styles.sidebar} isVisible={ui.sidebarIsVisible} />}
            </Observer>

            <div className={styles.content}>{children}</div>
        </BlankLayout>
    );
};
