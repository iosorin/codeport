import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ConfirmDialog, EventsChart, Table } from '@ui';
import { Stats, EventDialog } from './.ui';
import { useRoot } from '@/core';

export const Activity = observer(() => {
    const { activity: store } = useRoot();

    useEffect(() => {
        store.fetchEvents();
    }, [store]);

    return (
        <>
            <div className={`flex-col ${store.empty ? 'disabled' : ''}`}>
                <Stats length={store.events.length} total={store.total} />

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

                            <EventDialog
                                close={() => store.toggleDialog()}
                                details={store.dialogEvent}
                                isLoading={store.isLoading}
                                isVisible={store.dialogIsVisible}
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
