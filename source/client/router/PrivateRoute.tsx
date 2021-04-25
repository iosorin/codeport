import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDocumentTitle } from '@hooks';
import { NestedRoute } from './routes';

export const PrivateRoute: FC<NestedRoute> = ({ component: Component, meta = {}, ...rest }) => {
    const { requiresAuth, title } = meta;

    // todo - fix
    const isAuthentificated = true;
    const showRouteComponent = requiresAuth ? isAuthentificated : true;

    useDocumentTitle(title);

    return (
        <Route
            render={(props) =>
                // eslint-disable-next-line react/jsx-props-no-spreading
                showRouteComponent ? <Component {...props} /> : <Redirect to="/" />
            }
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    );
};
