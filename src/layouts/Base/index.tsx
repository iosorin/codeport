import React, { FC } from 'react';
import { Observer } from 'mobx-react-lite';
import { Sidebar } from '@/router/Sidebar';
import { BlankLayout } from '@layouts';
import { useCore } from '@/core';
import styles from './styles.scss';

type Props = {
    wide?: boolean;
};

export const BaseLayout: FC<Props> = ({ wide, children }) => {
    const { ui } = useCore();

    return (
        <BlankLayout>
            <Observer>
                {() => <Sidebar className={styles.sidebar} isVisible={ui.sidebarIsVisible} />}
            </Observer>

            <div className={`${styles.content} ${wide ? styles.wide : ''}`}>{children}</div>
        </BlankLayout>
    );
};
