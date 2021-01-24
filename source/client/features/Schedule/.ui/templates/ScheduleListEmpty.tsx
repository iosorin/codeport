import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@/library/.ui';

type Props = {
    openDialog: () => void;
};

export const ScheduleListEmpty: FC<Props> = observer(({ openDialog }) => {
    return (
        <>
            <h3 className="text-grey">The list of scheduled conferences is empty.</h3>

            <Button background="primary" className="mt-2" onClick={openDialog} size="large">
                Schedule a new conference
            </Button>
        </>
    );
});
