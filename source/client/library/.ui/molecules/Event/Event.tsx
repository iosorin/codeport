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
    small?: boolean;
};

export const Event: FC<Props> = observer(
    ({ details, date: showDate = true, rating, showEmpty, accent, small }) => {
        const displayMap = [
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
            displayMap.push({
                label: 'Rating',
                value: details.rating.toString() + ' / 10',
            });
        }

        if (showDate) {
            displayMap.unshift({
                label: 'Date',
                value: date.when(details.date),
            });
        }

        return (
            <div className={`${accent ? 'text-accent' : ''} ${small ? styles.small : ''}`}>
                {displayMap.map((detail, index) => {
                    const empty = showEmpty && !detail.value;

                    return (
                        (showEmpty || detail.value) && (
                            <p key={index} className={empty ? 'text-grey' : ''}>
                                <b>{detail.label}</b>

                                {empty ? (
                                    <span>:&nbsp;not specified</span>
                                ) : (
                                    <span>:&nbsp;{detail.value}</span>
                                )}
                            </p>
                        )
                    );
                })}
            </div>
        );
    }
);
