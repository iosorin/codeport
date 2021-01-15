import React, { FC } from 'react';
import { Observer } from 'mobx-react-lite';
import { Sidebar } from '@/router/Sidebar';
import { BlankLayout } from '@layouts';
import { useCore } from '@/core';
import styles from './base-layout.scss';

type Props = {
    wide?: boolean;
    centered?: boolean;
};

export const BaseLayout: FC<Props> = ({ wide, centered, children }) => {
    const classlist = [styles.content];

    if (wide) classlist.push(styles.wide);
    if (centered) classlist.push(styles.centered);

    const { ui } = useCore();

    return (
        <BlankLayout>
            <Observer>
                {() => <Sidebar className={styles.sidebar} isVisible={ui.sidebarIsVisible} />}
            </Observer>

            <div className={classlist.join(' ')}>{children}</div>
        </BlankLayout>
    );
};
