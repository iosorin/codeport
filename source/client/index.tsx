import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Router as AppRouter } from '@/router';
import { CoreProvider } from '@/core';
import { Toasts } from '@ui';
import './styles/app.scss';

ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <CoreProvider>
                <AppRouter />
                <Toasts />
            </CoreProvider>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
);
