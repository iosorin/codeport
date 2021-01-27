import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ScheduleEvent } from 'types';
import { ScheduleDialog } from './.ui/organisms/ScheduleDialog';
import { ScheduleList, ScheduleListEmpty } from './.ui/templates';
import store from './store';

export const Schedule: FC = observer(() => {
    useEffect(() => {
        store.getEvents();
    }, []);

    const openDialog = (event: ScheduleEvent | null = null) => {
        store.setDialogEvent(event);
        store.toggleDialog(true);
    };

    const closeDialog = () => {
        store.setDialogEvent(null);
        store.toggleDialog(false);
    };

    return (
        <>
            {store.events.length ? (
                <ScheduleList
                    events={store.sorted}
                    openDialog={openDialog}
                    removeEvent={store.removeEvent}
                    todayEvents={store.todayEvents}
                />
            ) : (
                <ScheduleListEmpty openDialog={() => openDialog()} />
            )}

            <ScheduleDialog closeDialog={closeDialog} store={store} />
        </>
    );
});
