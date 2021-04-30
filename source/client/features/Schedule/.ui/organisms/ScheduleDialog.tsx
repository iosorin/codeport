import React, { FC } from 'react';
import { Dialog, EventForm } from '@ui';
import { ScheduleStoreType } from '../../store';
import { observer } from 'mobx-react-lite';
import type { ActivityEvent } from 'types';

type Props = {
    store: ScheduleStoreType;
};

export const ScheduleDialog: FC<Props> = observer(({ store }) => {
    const submitHandler = async (details: Partial<ActivityEvent>) => {
        if (details.id) {
            // @ts-ignore
            await store.update(details);
        } else {
            await store.create(details);
        }

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
