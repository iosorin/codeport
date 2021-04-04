import React, { FC } from 'react';
import { ScheduleEvent } from 'types';
import { date } from '@/library/utils';
import styles from './event.scss';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

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
            <div
                className={classNames({
                    'text-accent': accent,
                    [styles.small]: small,
                    [styles.normal]: !small,
                })}
            >
                {displayMap.map((detail, index) => {
                    const empty = showEmpty && !detail.value;
                    const Label = empty ? 'span' : 'b';
                    const color = empty ? 'text-grey' : '';

                    return (
                        (showEmpty || detail.value) && (
                            <p key={index} className={color}>
                                <Label>{detail.label}</Label>

                                <span>:&nbsp;{detail.value || 'not specified'}</span>
                            </p>
                        )
                    );
                })}
            </div>
        );
    }
);
