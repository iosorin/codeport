import React, { FC } from 'react';
import { Button } from '@/library/.ui';
import { ScheduleStoreType } from '../../store';
import { observer } from 'mobx-react-lite';

type Props = {
    store: ScheduleStoreType;
};

export const ScheduleHeading: FC<Props> = observer(({ store }) => {
    const text = () => {
        if (store.events.length) {
            if (store.today) {
                return `Today you have ${store.today} scheduled event ${
                    store.today >= 3 ? '🔥' : '🤞'
                }`;
            }

            return "You don't have any events scheduled for today";
        }

        return 'The list of scheduled events is empty';
    };

    return (
        <div className={`${store.empty ? 'text-center' : 'flex-between'}`}>
            <div className={`h5 text-grey ${store.empty ? 'mb-2' : ''}`}>{text()}</div>

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
