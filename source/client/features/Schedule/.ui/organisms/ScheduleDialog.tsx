import React, { FC } from 'react';
import { Dialog, EventForm } from '@ui';
import { ScheduleStoreType } from '../../store';
import { observer } from 'mobx-react-lite';
import { ScheduleEvent } from 'types';

type Props = {
    store: ScheduleStoreType;
};

export const ScheduleDialog: FC<Props> = observer(({ store }) => {
    const submitHandler = async (details: ScheduleEvent) => {
        const action = details.id ? store.updateEvent : store.createEvent;

        // @ts-ignore
        await action(details);

        store.toggleDialog();
    };

    return (
        <Dialog
            close={() => store.toggleDialog()}
            visible={store.dialogVisible}
            title={store.dialogEvent?.title ?? 'Schedule Event'}
            size="large"
        >
            <EventForm details={store.dialogEvent} onSubmit={submitHandler} exclude={['color']} />
        </Dialog>
    );
});
