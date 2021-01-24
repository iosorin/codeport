import { Button } from '@/library/.ui';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Plus } from 'react-feather';
import { ScheduleEventStrict } from 'types';
import { ScheduleEventCard } from '../organisms';

type Props = {
    events: ScheduleEventStrict[];
    openDialog: (event?: ScheduleEventStrict) => void;
    removeEvent: (event: ScheduleEventStrict) => void;
};

export const ScheduleList: FC<Props> = observer(({ events, removeEvent, openDialog }) => {
    return (
        <>
            <div className="grid flex-1 scrollable">
                {events.map((event) => (
                    <ScheduleEventCard
                        event={event}
                        openDialog={openDialog}
                        removeEvent={removeEvent}
                        key={event.id}
                    />
                ))}
            </div>

            <Button
                background="light"
                className="mt-auto ml-auto"
                onClick={() => openDialog()}
                rounded
                size="large"
            >
                <Plus />
            </Button>
        </>
    );
});
