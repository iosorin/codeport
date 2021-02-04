import React from 'react';
import { observer } from 'mobx-react-lite';
import { ConfirmDialog, Chart, Table } from '@/library/.ui';
import { ActivityDetails } from './ActivityDetails';
import { Stats } from './.ui';
import store from './store';

export const Activity = observer(() => {
    return (
        <>
            {store.empty && (
                <p className="h4 text-grey">The history of your activity will be recorded here</p>
            )}

            <div className={`flex-col ${store.empty ? 'disabled' : ''}`}>
                {!store.empty && <Stats store={store} />}

                <div className="flex-col-reverse mt-2">
                    {!store.empty && (
                        <div className="mt-2">
                            <Table
                                background="light"
                                color="color"
                                edit={store.updateEvent}
                                editable={{ title: 'text', rating: 'number' }}
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

                            <ActivityDetails
                                close={() => store.toggleDialog(null)}
                                details={store.dialogEvent}
                                isVisible={store.dialogIsVisible}
                                setDetails={store.updateDialogEvent}
                            />

                            <ConfirmDialog
                                close={() => store.toggleConfirmDialog(null)}
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

                    <Chart size={15} source={store.events} />
                </div>
            </div>
        </>
    );
});
