import React, { FC, FormEvent, useState } from 'react';
import { Dialog, EventForm, Button } from '@ui';
import { ScheduleStoreType } from '../../store';
import { observer } from 'mobx-react-lite';
import { ScheduleEvent } from 'types';

type Props = {
    store: ScheduleStoreType;
    closeDialog: () => void;
};

export const ScheduleDialog: FC<Props> = observer(({ store, closeDialog }) => {
    const submitHandler = async (details: ScheduleEvent) => {
        const action = details.id ? store.updateEvent : store.createEvent;

        await action(details);

        closeDialog();
    };

    return (
        <Dialog close={closeDialog} isVisible={store.dialogIsVisible} title="Schedule Event">
            <EventForm details={store.dialogEvent} onSubmit={submitHandler} exclude={['color']} />
        </Dialog>
    );
});
