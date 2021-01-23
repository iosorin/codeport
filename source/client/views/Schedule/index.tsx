import React, { FC, useEffect, useState } from 'react';
import { BaseLayout } from '@layouts';
import { Block, Button, Loader, Transition } from '@/library/.ui';
import { ScheduleDialog } from './ScheduleDialog';
import { Plus } from 'react-feather';
import { useApi } from '@/core';
import { ScheduleEvent } from 'types';

// title, date, stack, salary, contacts, additional

export const Schedule: FC = () => {
    const api = useApi();

    const [loading, setLoading] = useState(true);
    const [scheduleList, setScheduleList] = useState<ScheduleEvent[]>([]);
    const [activeEvent, setActiveEvent] = useState<ScheduleEvent | null>(null);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    useEffect(() => {
        setLoading(true);

        api.schedule
            .getAll()
            .then(setScheduleList)
            .finally(() => setTimeout(() => setLoading(false), 300));
    }, [api.schedule]);

    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);

    const editEvent = (event: ScheduleEvent) => {
        setActiveEvent(event);
        openDialog();
    };

    return (
        <BaseLayout>
            <h1>Schedule</h1>

            {loading && <Loader />}

            <Transition in={!scheduleList.length && !loading}>
                <div className="container">
                    <h3 className="text-grey">The list of scheduled conferences is empty.</h3>

                    <Button background="primary" className="mt-2" onClick={openDialog} size="large">
                        Schedule a new conference
                    </Button>
                </div>
            </Transition>

            <Transition in={scheduleList.length && !loading}>
                <div className="container">
                    <div className="grid flex-1 scrollable">
                        {scheduleList.map((event) => (
                            <Block
                                key={event.id}
                                background="dark"
                                controlsInBottom
                                icon="🐱‍"
                                onEdit={() => editEvent(event)}
                                onRemove={console.log}
                                styled
                                title={event.title}
                            >
                                <p>
                                    <b>Date:</b> {new Date(event.date).toLocaleString()}
                                </p>

                                {event.stack && (
                                    <p>
                                        <b>Stack:</b> {event.stack}
                                    </p>
                                )}

                                {event.salary && (
                                    <p>
                                        <b>Salary:</b> {event.salary}
                                    </p>
                                )}
                                {event.contacts && (
                                    <p>
                                        <b>Contacts:</b> {event.contacts}
                                    </p>
                                )}
                                {event.additional && (
                                    <p className="scrollable" style={{ maxHeight: '100px' }}>
                                        <b>Additional:</b> {event.additional}
                                    </p>
                                )}
                            </Block>
                        ))}
                    </div>

                    <Button
                        background="light"
                        className="mt-auto ml-auto"
                        onClick={openDialog}
                        rounded
                        size="large"
                    >
                        <Plus />
                    </Button>
                </div>
            </Transition>

            <ScheduleDialog
                closeDialog={closeDialog}
                event={activeEvent}
                isOpen={dialogIsOpen}
                onSubmit={console.log}
            />
        </BaseLayout>
    );
};
