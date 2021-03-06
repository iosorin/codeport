import React, { FC } from 'react';
import { Button } from '@/library/.ui';
import { ScheduleNotification } from '../../molecules';

type Props = {
    today: number;
    total: number;
    openDialog: () => void;
};

export const ScheduleHead: FC<Props> = ({ today, total, openDialog }) => {
    return (
        <div className="flex-between">
            <p className="h3 text-grey mb-2">The list of scheduled events is empty</p>

            <Button background="primary" onClick={openDialog} size="large">
                Schedule a new event
            </Button>
        </div>
    );
};
