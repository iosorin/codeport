import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, always } from '@core';
import { Observer } from 'mobx-react-lite';
import { Toasts } from '@ui';
import { Router } from '@/router';
import './styles/app.scss';

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<Provider>
				<Router />

				<Observer>{() => <Toasts toasts={always('toast').list} />}</Observer>
			</Provider>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
);
