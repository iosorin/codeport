import React from 'react';
import { Link } from 'react-router-dom';
import { BlankLayout } from '@layouts';

export const Exception = (): JSX.Element => {
    return (
        <BlankLayout>
            <div className="flex-center flex-column" style={{ width: '100%' }}>
                <h1 className="text-center mb-2">Page Not Found</h1>
                <Link to="/">back home</Link>
            </div>
        </BlankLayout>
    );
};
