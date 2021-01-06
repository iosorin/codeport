import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, AtSign, Bell, Book, Calendar, LogIn, Video } from 'react-feather';
import { Tooltip, Logo } from '@ui';
import { ROUTES } from '@/router';
import styles from './sidebar.scss';

export type Props = {
    className?: string;
    isVisible: boolean;
};

export const Sidebar: FC<Props> = ({ className = '', isVisible }) => {
    return (
        <div className={`${styles.sidebar} ${isVisible ? '' : styles.hidden} ${className}`}>
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

                <Tooltip content="Schedule">
                    <Calendar />
                </Tooltip>

                <Tooltip content="Notifications">
                    <Bell />
                </Tooltip>
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
};
