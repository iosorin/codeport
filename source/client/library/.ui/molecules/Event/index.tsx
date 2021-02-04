import React, { FC } from 'react';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { date } from '@/library/utils';
import styles from './event.scss';

type Props = {
    details: ScheduleEvent;
    showRating?: boolean;
    showDate?: boolean;
    showEmpty?: boolean;
    small?: boolean;
};

export const Event: FC<Props> = ({ details, showDate = true, showRating, showEmpty, small }) => {
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
        <div className={small ? styles.small : ''}>
            {map.map((detail, index) => {
                return (
                    (showEmpty || detail.value) && (
                        <p key={index}>
                            <b>{detail.label}:</b> <br />
                            <span>{detail.value || (showEmpty && empty)}</span>
                        </p>
                    )
                );
            })}
        </div>
    );
};
