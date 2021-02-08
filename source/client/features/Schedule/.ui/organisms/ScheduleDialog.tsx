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
    const submitHandler = (details: ScheduleEvent) => {
        const action = details.id ? store.updateEvent : store.createEvent;

        action(details);
    };

    return (
        <Dialog close={closeDialog} isVisible={store.dialogIsVisible} title="Schedule Event">
            <EventForm details={store.dialogEvent} onSubmit={submitHandler} />
        </Dialog>
    );
});
