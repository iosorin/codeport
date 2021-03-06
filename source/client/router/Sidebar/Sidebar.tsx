import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, AtSign, Bell, Book, Calendar, LogIn, Video } from 'react-feather';
import { Tooltip, Logo } from '@ui';
import { ROUTES } from '@/router';
import styles from './sidebar.scss';

export type Props = {
    className?: string;
    visible: boolean;
};

export const Sidebar: FC<Props> = ({ className = '', visible }) => {
    return (
        <div className={`${styles.sidebar} ${visible ? '' : styles.hidden} ${className}`}>
            <NavLink exact={ROUTES.HOME.exact} to={ROUTES.HOME.path}>
                <Logo className={styles.logo} short />
            </NavLink>

            <div className={styles.ul}>
                <NavLink
                    activeClassName={styles.active}
                    exact={ROUTES.CONFERENCE.exact}
                    to={ROUTES.CONFERENCE.pathFn()}
                >
                    <Tooltip content={ROUTES.CONFERENCE.link}>
                        <Video />
                    </Tooltip>
                </NavLink>

                <NavLink
                    activeClassName={styles.active}
                    exact={ROUTES.ACTIVITY.exact}
                    to={ROUTES.ACTIVITY.path}
                >
                    <Tooltip content={ROUTES.ACTIVITY.link}>
                        <Activity />
                    </Tooltip>
                </NavLink>

                <NavLink
                    activeClassName={styles.active}
                    exact={ROUTES.SCHEDULE.exact}
                    to={ROUTES.SCHEDULE.path}
                >
                    <Tooltip content="Schedule">
                        <Calendar />
                    </Tooltip>
                </NavLink>

                <NavLink
                    activeClassName={styles.active}
                    exact={ROUTES.NOTIFICATIONS.exact}
                    to={ROUTES.NOTIFICATIONS.path}
                >
                    <Tooltip content="Notifications">
                        <Bell />
                    </Tooltip>
                </NavLink>
            </div>

            <div className={styles.ul}>
                <NavLink
                    activeClassName={styles.active}
                    exact={ROUTES.RESOURCES.exact}
                    to={ROUTES.RESOURCES.path}
                >
                    <Tooltip content={ROUTES.RESOURCES.title}>
                        <Book />
                    </Tooltip>
                </NavLink>

                <a href="mailto:official.osorina@gmail.com">
                    <Tooltip content="Get In Touch (@osorina)">
                        <AtSign />
                    </Tooltip>
                </a>

                <Tooltip content="Sign In">
                    <LogIn />
                </Tooltip>

                {/* <Tooltip content="Здесь попап в котором info(hotkeys), настройки профиля, возможно, выбор языка(ru/eng), кнопка на выход">
                    <User />
                </Tooltip> */}
            </div>
        </div>
    );
};
