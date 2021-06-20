import React, { FC } from 'react';
import { Switch } from 'react-router-dom';

import { NestedRoute, paths } from './routes';
import { PrivateRoute } from './PrivateRoute';

const flatRoutes = (list: NestedRoute[]): any[] =>
	list
		.map((route) => [route.routes ? flatRoutes(route.routes) : [], route])
		.flat(Infinity);

export const Router: FC = () => {
	return (
		<Switch>
			{flatRoutes(paths).map((route) => (
				<PrivateRoute {...route} key={route.path} />
			))}
		</Switch>
	);
};
