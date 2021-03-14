import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { ConfirmDialog } from '@/library/.ui';
import { ScheduleHeading, ScheduleList, ScheduleDialog, ScheduleCalendar } from './.ui/organisms';
import store from './store';

export const Schedule: FC = observer(() => {
    useEffect(() => {
        store.fetchEvents();
    }, []);

    const closeConfirm = () => store.toggleConfirmDialog();
    const handleConfirm = () => store.dialogEvent?.id && store.removeEvent(store.dialogEvent.id);

    return (
        <>
            <div
                className={classNames({
                    'my-auto': store.empty,
                })}
            >
                <ScheduleHeading store={store} />
            </div>

            {!store.empty && (
                <div className="flex mt-3">
                    <div className="flex-1 mr-3">
                        <ScheduleList store={store} />

                        <ScheduleList expired store={store} />
                    </div>

                    <div className="mt-3">
                        <ScheduleCalendar store={store} />
                    </div>
                </div>
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
