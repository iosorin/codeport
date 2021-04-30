import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from '@core';
import { Toasts } from '@ui';
import { Router as AppRouter } from '@/router';
import './styles/app.scss';

ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <Provider>
                <AppRouter />
                <Toasts />
            </Provider>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
);
