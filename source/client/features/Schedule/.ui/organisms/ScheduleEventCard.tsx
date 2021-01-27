import React, { FC } from 'react';
import { ScheduleEventStrict } from 'types';
import { Block } from '@ui';
import { date } from '@/library/utils';

type Props = {
    event: ScheduleEventStrict;
    removeEvent: (event: ScheduleEventStrict) => void;
    openDialog: (event: ScheduleEventStrict) => void;
};

export const ScheduleEventCard: FC<Props> = ({ event, removeEvent, openDialog, children }) => {
    const empty = <span className="text-grey">-</span>;
    const startsIn = date.diff(event.date);

    return (
        <Block
            background="dark"
            onEdit={() => openDialog(event)}
            onRemove={() => removeEvent(event)}
            styled
            title={event.title}
            height="220px"
            small={startsIn ? `starts in: ${startsIn}` : ''}
        >
            <p>
                <b>Date:&nbsp;</b> {date.when(event.date)}
            </p>

            <p>
                <b>Stack:&nbsp;</b> {event.stack || empty}
            </p>

            <p>
                <b>Salary:&nbsp;</b> {event.salary || empty}
            </p>
            <p>
                <b>Contacts:&nbsp;</b> {event.contacts || empty}
            </p>

            <>
                <p className="scrollable" style={{ maxHeight: '90px' }}>
                    <b>Additional:&nbsp;</b> {event.additional || empty}
                </p>
            </>

            {children}
        </Block>
    );
};
