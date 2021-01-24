import React, { FC } from 'react';
import { BaseLayout } from '@layouts';
import { Schedule } from '@/features/Schedule';

export const ScheduleView: FC = () => {
    return (
        <BaseLayout>
            <h1>Schedule</h1>

            <div className="container">
                <Schedule />
            </div>
        </BaseLayout>
    );
};
