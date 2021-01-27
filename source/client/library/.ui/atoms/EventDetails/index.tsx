import React, { FC } from 'react';
import { ScheduleEvent } from 'types';
import { date } from '@/library/utils';

type Props = {
    event: ScheduleEvent;
    showEmpty?: boolean;
    inline?: boolean;
};

export const EventDetails: FC<Props> = ({ event, showEmpty, inline }) => {
    const Tagname = inline ? 'span' : 'p';

    const empty = <span className="text-grey">-</span>;

    const details = [
        {
            label: 'Date',
            value: date.when(event.date),
        },
        {
            label: 'Stack',
            value: event.stack,
        },
        {
            label: 'Salary',
            value: event.salary,
        },
        {
            label: 'Contacts',
            value: event.contacts,
        },
    ];

    return (
        <>
            {details.map((detail) => {
                const show = showEmpty || detail.value;

                return (
                    show && (
                        <Tagname>
                            <b>{detail.label}:</b> {detail.value || (showEmpty && empty)}
                            {inline && '; '}
                        </Tagname>
                    )
                );
            })}

            {(showEmpty || event.additional) && (
                <Tagname className="scrollable" style={{ maxHeight: '90px' }}>
                    <b>Additional:&nbsp;</b> {event.additional || empty}
                </Tagname>
            )}
        </>
    );
};
