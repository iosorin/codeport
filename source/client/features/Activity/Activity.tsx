import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ConfirmDialog, EventsChart, Table } from '@ui';
import { ActivityStats, ActivityDialog } from './.ui';
import store from './store';

export const Activity = observer(() => {
    useEffect(() => {
        store.fetchEvents();
    }, []);

    return (
        <>
            <div className={`flex-col ${store.empty ? 'disabled' : ''}`}>
                <ActivityStats store={store} />

                <div className="flex-col-reverse mt-2">
                    {!store.empty && (
                        <div className="mt-2">
                            <Table
                                background="light"
                                color="color"
                                labels={[
                                    'title',
                                    'stack',
                                    'salary',
                                    'snippets',
                                    'time',
                                    'rating',
                                    'date',
                                ]}
                                onDelete={store.toggleConfirmDialog}
                                onTrClick={store.toggleDialog}
                                prefixes={{ time: ' min.', rating: ' / 10' }}
                                sortable={['date', 'rating']}
                                source={store.events}
                            />

                            <ActivityDialog
                                close={() => store.toggleDialog()}
                                details={store.dialogEvent}
                                isVisible={store.dialogIsVisible}
                                loading={store.loading}
                                setDetails={store.updateDialogEvent}
                            />

                            <ConfirmDialog
                                close={() => store.toggleConfirmDialog()}
                                confirm={() =>
                                    store.dialogEvent && store.removeEvent(store.dialogEvent.id)
                                }
                                isVisible={store.confirmDialogIsVisible}
                            >
                                <div className="h3 mb-1">
                                    Remove event &quot;{store.dialogEvent?.title}&quot; <br /> from
                                    your activity history?
                                </div>
                            </ConfirmDialog>
                        </div>
                    )}

                    <EventsChart events={store.events} size={15} />
                </div>
            </div>
        </>
    );
});
