import { Home } from '@/views/Home';
import { Activity } from '@/views/Activity';
import { Resources } from '@/views/Resourses';
import { Exception } from '@/views/Exception';
import { RouteComponentProps } from 'react-router-dom';

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
    HOME: { title: 'Home', link: 'Go Home', path: '/' },
    CONFERENCE: { title: 'Conference Room', link: 'New Conference', path: '/:uuid' },
    ACTIVITY: { title: 'Activity', link: 'Activity', path: '/activity' },
    RESOURCES: { title: 'Essential Resources', link: 'Essential Resources', path: '/resources' },
    EXCEPTION: { title: 'Page Not Found', path: '*' },
};

/* paths */
export const paths: Array<NestedRouteProps> = [
    {
        path: ROUTES.ACTIVITY.path,
        component: Activity,
        exact: true,
        meta: {
            title: ROUTES.ACTIVITY.title,
            requiresAuth: true,
        },
    },
    {
        path: ROUTES.RESOURCES.path,
        component: Resources,
        exact: true,
        meta: {
            title: ROUTES.RESOURCES.title,
            requiresAuth: false,
        },
    },
    {
        path: ROUTES.CONFERENCE.path,
        component: Home,
        exact: true,
        meta: {
            title: ROUTES.CONFERENCE.title,
            requiresAuth: false,
        },
    },
    {
        path: ROUTES.HOME.path,
        component: Home,
        exact: true,
        meta: {
            title: ROUTES.HOME.title,
            requiresAuth: false,
        },
    },

    {
        path: ROUTES.EXCEPTION.path,
        component: Exception,
        meta: {
            title: ROUTES.EXCEPTION.title,
            requiresAuth: false,
        },
    },
];
