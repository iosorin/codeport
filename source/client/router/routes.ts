import { RouteComponentProps } from 'react-router-dom';
import { HomeView } from '@/views/Home';
import { ActivityView } from '@/views/Activity';
import { ResourcesView } from '@/views/Resourses';
import { ExceptionView } from '@/views/Exception';
import { uuid } from '@/library/utils';
import { NotificationsView } from '@/views/Notifications';
import { ScheduleView } from '@/views/Schedule';

/* types */
type MetaProps = {
    title?: string;
    requiresAuth?: boolean;
    redirectHome?: boolean;
};

export type PureRoute = {
    path: string;
    exact?: boolean;
    meta?: MetaProps;
    component: React.FC<RouteComponentProps>; // | JSX.Element
};

export type NestedRoute = PureRoute & { routes?: PureRoute[] };

/* constants */
export const ROUTES = {
    HOME: { title: 'Home', link: 'Go Home', path: '/', exact: true },
    CONFERENCE: {
        title: 'Conference Room',
        link: 'New Conference',
        path: '/conference/:uuid',
        pathFn: () => `/conference/${uuid()}`,
        exact: true,
    },
    ACTIVITY: { title: 'Activity', link: 'Activity', path: '/activity', exact: true },
    SCHEDULE: { title: 'Schedule', link: 'Schedule', path: '/schedule', exact: true },
    NOTIFICATIONS: {
        title: 'Notifications',
        link: 'Notifications',
        path: '/notifications',
        exact: true,
    },
    RESOURCES: {
        title: 'Essential Resources',
        link: 'Essential Resources',
        path: '/resources',
        exact: false,
    },
    EXCEPTION: { title: 'Page Not Found', path: '*', exact: true },
};

/* paths */
export const paths: NestedRoute[] = [
    {
        path: ROUTES.HOME.path,
        component: HomeView,
        exact: ROUTES.HOME.exact,
        meta: {
            title: ROUTES.HOME.title,
        },
    },
    {
        path: ROUTES.CONFERENCE.path,
        component: HomeView,
        exact: ROUTES.CONFERENCE.exact,
        meta: {
            title: ROUTES.CONFERENCE.title,
        },
    },
    {
        path: ROUTES.ACTIVITY.path,
        component: ActivityView,
        exact: ROUTES.ACTIVITY.exact,
        meta: {
            title: ROUTES.ACTIVITY.title,
            requiresAuth: true,
        },
    },
    {
        path: ROUTES.SCHEDULE.path,
        component: ScheduleView,
        exact: ROUTES.SCHEDULE.exact,
        meta: {
            title: ROUTES.SCHEDULE.title,
            requiresAuth: true,
        },
    },
    {
        path: ROUTES.NOTIFICATIONS.path,
        component: NotificationsView,
        exact: ROUTES.NOTIFICATIONS.exact,
        meta: {
            title: ROUTES.NOTIFICATIONS.title,
            requiresAuth: true,
        },
    },
    {
        path: ROUTES.RESOURCES.path,
        component: ResourcesView,
        exact: ROUTES.RESOURCES.exact,
        meta: {
            title: ROUTES.RESOURCES.title,
        },
    },
    {
        path: ROUTES.EXCEPTION.path,
        component: ExceptionView,
        meta: {
            title: ROUTES.EXCEPTION.title,
        },
    },
];
