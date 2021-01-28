import React, { FC } from 'react';
import { BaseLayout } from '@layouts';
import { Activity } from '@/features/Activity';

export const ActivityView: FC = () => {
    return (
        <BaseLayout>
            <h1>Activity</h1>

            <Activity />
        </BaseLayout>
    );
};
