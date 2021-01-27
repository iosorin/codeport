import { Button } from '@ui';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Plus } from 'react-feather';
import { ScheduleEventStrict } from 'types';
import { ScheduleEventCard } from '../organisms';
import { ScheduleNotification } from '../molecules';

type Props = {
    events: ScheduleEventStrict[];
    todayEvents: ScheduleEventStrict[];
    openDialog: (event?: ScheduleEventStrict) => void;
    removeEvent: (event: ScheduleEventStrict) => void;
};

export const ScheduleList: FC<Props> = observer(
    ({ events, todayEvents, removeEvent, openDialog }) => {
        return (
            <>
                <ScheduleNotification count={todayEvents.length} />

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
                    background="primary"
                    className="mt-auto ml-auto"
                    onClick={() => openDialog()}
                    rounded
                    size="large"
                >
                    <Plus />
                </Button>
            </>
        );
    }
);
