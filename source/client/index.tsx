import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Router as AppRouter } from './router';
import { CoreProvider } from '@/core';
import './styles/app.scss';

ReactDOM.render(
    <StrictMode>
        <CoreProvider>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </CoreProvider>
    </StrictMode>,
    document.getElementById('root')
);
