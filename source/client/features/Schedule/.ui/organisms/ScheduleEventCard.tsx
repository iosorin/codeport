import React, { FC } from 'react';
import { ScheduleEventStrict } from 'types';
import { Block } from '@/library/.ui';

type Props = {
    event: ScheduleEventStrict;
    removeEvent: (event: ScheduleEventStrict) => void;
    openDialog: (event: ScheduleEventStrict) => void;
};

export const ScheduleEventCard: FC<Props> = ({ event, removeEvent, openDialog }) => {
    return (
        <Block
            background="dark"
            controlsInBottom
            icon="🐱‍"
            onEdit={() => openDialog(event)}
            onRemove={() => removeEvent(event)}
            styled
            title={event.title}
        >
            <p>
                <b>Date:</b> <u>{new Date(event.date).toLocaleString()}</u>
            </p>

            {event.stack && (
                <p>
                    <b>Stack:</b> {event.stack}
                </p>
            )}

            {event.salary && (
                <p>
                    <b>Salary:</b> {event.salary}
                </p>
            )}
            {event.contacts && (
                <p>
                    <b>Contacts:</b> {event.contacts}
                </p>
            )}

            {event.additional && (
                <p className="scrollable" style={{ maxHeight: '100px' }}>
                    <b>Additional:</b> {event.additional}
                </p>
            )}
        </Block>
    );
};
