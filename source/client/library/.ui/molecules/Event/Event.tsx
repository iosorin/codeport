import React, { FC } from 'react';
import { ScheduleEvent } from 'types';
import { date } from '@/library/utils';
import styles from './event.scss';
import { observer } from 'mobx-react-lite';

type Props = {
    details: ScheduleEvent;
    rating?: boolean;
    date?: boolean;
    showEmpty?: boolean;
    accent?: boolean;
};

export const Event: FC<Props> = observer(
    ({ details, date: showDate = true, rating, showEmpty, accent }) => {
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

        if (rating && typeof details.rating === 'number') {
            map.push({
                label: 'Rating',
                value: details.rating.toString() + ' / 10',
            });
        }

        if (showDate) {
            map.unshift({
                label: 'Date',
                value: date.when(details.date),
            });
        }

        return (
            <div className={accent ? styles.accent : ''}>
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
    }
);
