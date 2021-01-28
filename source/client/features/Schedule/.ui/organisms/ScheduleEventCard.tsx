import React, { FC } from 'react';
import { ScheduleEventStrict } from 'types';
import { Block, Event } from '@ui';
import { date } from '@/library/utils';

type Props = {
    event: ScheduleEventStrict;
    removeEvent: (event: ScheduleEventStrict) => void;
    openDialog: (event: ScheduleEventStrict) => void;
};

export const ScheduleEventCard: FC<Props> = ({ event, removeEvent, openDialog, children }) => {
    const startsIn = date.diff(event.date);

    return (
        <Block
            background="black"
            onEdit={() => openDialog(event)}
            onRemove={() => removeEvent(event)}
            styled
            title={event.title}
            height="220px"
            customBackground={event.color}
            small={startsIn ? `starts in: ${startsIn}` : ''}
        >
            <Event details={event} />

            {children}
        </Block>
    );
};
