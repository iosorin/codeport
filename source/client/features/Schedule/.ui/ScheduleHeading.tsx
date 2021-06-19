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

        if (store.empty) {
            return "List of scheduled meetings is empty";
        }

        if (today) {
            if (today > 1) {
            return `Today you have ${today} scheduled meetings ${today >= 3 ? '🔥' : '🤞'}`;
            }

            return (
                <>
                    Today you have planned{' '}
                    <u className="text-primary">{store.today[0].title}</u> event
                </>
                );
            }

            return "You don't have any meetings scheduled for today";

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
