import React, { FC } from 'react';
import { Switch } from 'react-router-dom';

import { NestedRouteProps, paths } from './routes';
import { PrivateRoute } from './PrivateRoute';

export const Router: FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flatRoutes = (list: NestedRouteProps[]): any[] => {
        return list
            .map((route) => [route.routes ? flatRoutes(route.routes) : [], route])
            .flat(Infinity);
    };

    return (
        <Switch>
            {flatRoutes(paths).map((route) => (
                <PrivateRoute {...route} key={route.path} />
            ))}
        </Switch>
    );
};
