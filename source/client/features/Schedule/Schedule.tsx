import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ScheduleDialog } from './.ui/organisms/ScheduleDialog';
import { ScheduleTemplate, ScheduleTemplateEmpty } from './.ui/templates';
import store from './store';
import { ConfirmDialog } from '@/library/.ui';

export const Schedule: FC = observer(() => {
    useEffect(() => {
        store.fetchEvents();
    }, []);

    const closeConfirm = () => store.toggleConfirmDialog();
    const handleConfirm = () => store.dialogEvent?.id && store.removeEvent(store.dialogEvent.id);

    return (
        <>
            {store.empty ? (
                <ScheduleTemplateEmpty openDialog={store.openDialog} />
            ) : (
                <ScheduleTemplate store={store} />
            )}

            <ScheduleDialog store={store} />

            <ConfirmDialog
                close={closeConfirm}
                confirm={handleConfirm}
                visible={store.confirmDialogVisible}
            >
                <div className="h3 mb-1">
                    Remove event &quot;{store.dialogEvent?.title}&quot; <br /> from your schedule?
                </div>
            </ConfirmDialog>
        </>
    );
});
