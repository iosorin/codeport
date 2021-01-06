import { Home } from '@/views/Home';
import { Activity } from '@/views/Activity';
import { Resources } from '@/views/Resourses';
import { Exception } from '@/views/Exception';
import { RouteComponentProps } from 'react-router-dom';
import { uuid } from '@/library/utils';

/* types */
type MetaProps = {
    title?: string;
    requiresAuth?: boolean;
    isLoginToHome?: boolean;
};

export type PureRouteProps = {
    path: string;
    component: React.FC<RouteComponentProps>; // | JSX.Element
    exact?: boolean;
    meta?: MetaProps;
};

export type NestedRouteProps = PureRouteProps & { routes?: Array<PureRouteProps> };

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
    RESOURCES: {
        title: 'Essential Resources',
        link: 'Essential Resources',
        path: '/resources',
        exact: false,
    },
    EXCEPTION: { title: 'Page Not Found', path: '*', exact: true },
};

/* paths */
export const paths: Array<NestedRouteProps> = [
    {
        path: ROUTES.HOME.path,
        component: Home,
        exact: ROUTES.HOME.exact,
        meta: {
            title: ROUTES.HOME.title,
        },
    },
    {
        path: ROUTES.CONFERENCE.path,
        component: Home,
        exact: ROUTES.CONFERENCE.exact,
        meta: {
            title: ROUTES.CONFERENCE.title,
        },
    },
    {
        path: ROUTES.ACTIVITY.path,
        component: Activity,
        exact: ROUTES.ACTIVITY.exact,
        meta: {
            title: ROUTES.ACTIVITY.title,
            requiresAuth: true,
        },
    },
    {
        path: ROUTES.RESOURCES.path,
        component: Resources,
        exact: ROUTES.RESOURCES.exact,
        meta: {
            title: ROUTES.RESOURCES.title,
        },
    },
    {
        path: ROUTES.EXCEPTION.path,
        component: Exception,
        meta: {
            title: ROUTES.EXCEPTION.title,
        },
    },
];
