import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { ConfirmDialog, Table } from '@ui';
import { ActivityChart, ActivityDialog, ActivityStats } from './.ui';
import store from './store';

export const Activity = observer(() => {
    useEffect(() => {
        store.fetch();
    }, []);

    return (
        <>
            <div className={classNames('flex-col', { disabled: store.empty })}>
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
                                loading={store.loading}
                                setDetails={store.updateDialogEvent}
                                visible={store.dialogVisible}
                            />

                            <ConfirmDialog
                                close={() => store.toggleConfirmDialog()}
                                confirm={() =>
                                    store.dialogEvent && store.remove(store.dialogEvent.id)
                                }
                                visible={store.confirmDialogVisible}
                            >
                                <div className="h3 mb-1">
                                    Remove event &quot;{store.dialogEvent?.title}&quot; <br /> from
                                    your activity history?
                                </div>
                            </ConfirmDialog>
                        </div>
                    )}

                    <ActivityChart events={store.events} size={15} />
                </div>
            </div>
        </>
    );
});
