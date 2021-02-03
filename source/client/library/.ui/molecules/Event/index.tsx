import React, { FC } from 'react';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { date } from '@/library/utils';
import './event.scss';

type Props = {
    details: ScheduleEvent;
    showRating?: boolean;
    showDate?: boolean;
    showEmpty?: boolean;
};

export const Event: FC<Props> = ({ details, showDate = true, showRating, showEmpty }) => {
    const empty = <span className="text-grey">-</span>;

    const map = [
        {
            label: 'Stack',
            value: details.stack,
        },
        {
            label: 'Salary',
            value: details.salary,
        },
        {
            label: 'Contacts',
            value: details.contacts,
        },

        {
            label: 'Additional',
            value: details.additional,
        },
    ];

    if (showRating && details.rating) {
        map.push({
            label: 'Rating',
            value: details.rating.toString(),
        });
    }

    if (showDate) {
        map.unshift({
            label: 'Date',
            value: date.when(details.date),
        });
    }

    return (
        <>
            {map.map((detail, index) => {
                return (
                    (showEmpty || detail.value) && (
                        <p key={index}>
                            <b>{detail.label}</b>: <br />
                            {detail.value || (showEmpty && empty)}
                        </p>
                    )
                );
            })}
        </>
    );
};
