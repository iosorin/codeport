import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Activity, AtSign, Bell, Book, Calendar, LogIn, Video } from 'react-feather';
import { useCore } from '@/core';
import { Tooltip, Logo } from '@ui';
import { ROUTES } from '@/router';
import { uuid } from '@/library/utils';
import styles from './sidebar.scss';

export type Props = {
    className?: string;
};

export const Sidebar: FC<Props> = observer(({ className = '' }) => {
    const { ui } = useCore();

    return (
        <div
            className={`${styles.sidebar} ${ui.sidebarIsVisible ? '' : styles.hidden} ${className}`}
        >
            <NavLink to={ROUTES.HOME.path}>
                <Logo className={styles.logo} short />
            </NavLink>

            <div className={styles.ul}>
                <NavLink to={`/${uuid()}`} activeClassName={styles.active}>
                    <Tooltip content={ROUTES.CONFERENCE.link}>
                        <Video />
                    </Tooltip>
                </NavLink>

                <NavLink activeClassName={styles.active} to={ROUTES.ACTIVITY.path}>
                    <Tooltip content={ROUTES.ACTIVITY.link}>
                        <Activity />
                    </Tooltip>
                </NavLink>

                <Tooltip content="Schedule">
                    <Calendar />
                </Tooltip>

                <Tooltip content="Notifications">
                    <Bell />
                </Tooltip>
            </div>

            <div className={styles.ul}>
                <NavLink activeClassName={styles.active} to={ROUTES.RESOURCES.path}>
                    <Tooltip content={ROUTES.RESOURCES.title}>
                        <Book />
                    </Tooltip>
                </NavLink>

                <Tooltip content="Get In Touch (@osorina)">
                    <AtSign />
                </Tooltip>

                <Tooltip content="Sign In">
                    <LogIn />
                </Tooltip>

                {/* <Tooltip content="Здесь попап в котором info(hotkeys), настройки профиля, возможно, выбор языка(ru/eng), кнопка на выход">
                    <User />
                </Tooltip> */}
            </div>
        </div>
    );
});
