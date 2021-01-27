import React, { FC } from 'react';
import { Button } from '@ui';

type Props = {
    openDialog: () => void;
};

export const ScheduleListEmpty: FC<Props> = ({ openDialog }) => {
    return (
        <div className="text-center">
            <p className="text-grey mb-1">The list of scheduled events is empty</p>

            <Button background="primary" onClick={openDialog} size="large">
                Schedule a new event
            </Button>
        </div>
    );
};
