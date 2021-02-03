import React from 'react';
import { observer } from 'mobx-react-lite';
import { Block, ConfirmDialog, Stats, Table } from '@/library/.ui';
import { ActivityDetails } from './ActivityDetails';
import store from './store';

export const Activity = observer(() => {
    return (
        <>
            {store.empty && (
                <p className="h4 text-grey">The history of your activity will be recorded here</p>
            )}

            <div className={`flex-col ${store.empty ? 'disabled' : ''}`}>
                {!store.empty && (
                    <>
                        <div className="grid grid--25 mb-1">
                            <Block background="black" flex>
                                <small>Сonferences</small>
                                <b className="h2">{store.events.length}</b>
                            </Block>

                            <Block background="black" flex>
                                <small>Total time</small>
                                <b className="h2">{store.total.time} min.</b>
                            </Block>

                            <Block background="black" flex>
                                <small>Snippets</small>
                                <b className="h2">{store.total.snippets}</b>
                            </Block>
                        </div>
                    </>
                )}

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
                                onDetails={store.toggleDialog}
                                prefixes={{ time: ' min.' }}
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
                                confirm={console.log}
                                isVisible={store.confirmDialogIsVisible}
                            >
                                <div className="h3 mb-1">
                                    Remove event &quot;{store.dialogEvent?.title}&quot; <br /> from
                                    your activity history?
                                </div>
                            </ConfirmDialog>
                        </div>
                    )}

                    <Stats size={15} source={store.events} />
                </div>
            </div>
        </>
    );
});
