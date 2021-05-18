import React, { FC } from 'react';
import { Button } from '@ui';
import { ScheduleStoreType } from '../store';
import { observer } from 'mobx-react-lite';

type Props = {
    store: ScheduleStoreType;
};

export const ScheduleHeading: FC<Props> = observer(({ store }) => {
    const text = () => {
        const today = store.today.length;
        const week = store.week.length;

        if (store.events.length) {
            if (today) {
                if (today > 1) {
                    return `Today you have ${today} scheduled event ${today >= 3 ? '🔥' : '🤞'}`;
                }

                return `Today you have planned ${store.today[0].title} event`;
            }

            if (week) {
                return `This week you have ${week} planned events`;
            }

            return "You don't have any events scheduled for this week";
        }

        return 'The list of scheduled events is empty';
    };

    return (
        <div className={`${store.empty ? 'text-center' : 'flex-between'}`}>
            <p className={`text-grey text-accent ${store.empty ? 'mb-2' : ''}`}>{text()}</p>

            <Button
                background="primary"
                onClick={store.openDialog}
                size={store.empty ? 'large' : 'medium'}
                zoom
            >
                Schedule a new event
            </Button>
        </div>
    );
});
