import React, { FC } from 'react';
import { BaseLayout } from '@layouts';

export const ActivityView: FC = () => {
    return (
        <BaseLayout>
            <h1>Activity</h1>

            <p className="text-grey">The history of your conferences will be recorded here</p>
        </BaseLayout>
    );
};
