import React, { FC, useEffect, useState } from 'react';
import { BaseLayout } from '@layouts';
import { Block, Button } from '@/library/.ui';
import { ScheduleDialog } from './ScheduleDialog';
import { Plus } from 'react-feather';
import { useApi } from '@/core';

// title, date, stack, salary, work_format, contacts

export const Schedule: FC = () => {
    const api = useApi();

    const [scheduleList, setScheduleList] = useState([]);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    useEffect(() => {
        console.log('useEffect');
        api.schedule.getAll().then(setScheduleList);
    }, [api.schedule]);

    useEffect(() => {
        console.log(scheduleList);
    }, [scheduleList]);

    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);

    return (
        <BaseLayout>
            <h1>Schedule</h1>

            {false ? (
                <div className="container">
                    <h3 className="text-grey">The list of scheduled conferences is empty.</h3>

                    <Button background="primary" className="mt-2" onClick={openDialog} size="large">
                        Schedule a new conference
                    </Button>
                </div>
            ) : (
                <>
                    <div className="grid flex-1 scrollable">
                        <Block
                            background="dark"
                            icon="🐱‍"
                            onEdit={openDialog}
                            onRemove={console.log}
                            small="Jun 4 2020 at 5:35 am"
                            styled
                            title="SFXDX, Kaliningrad"
                        >
                            <p>
                                <b>Stack:</b> react, typescript, mobx, unit-tests
                            </p>
                            <p>
                                <b>Salary:</b> from 70 000 after taxes
                            </p>
                            <p>
                                <b>Contacts:</b> https://t.me/someone
                            </p>
                            <p className="scrollable" style={{ maxHeight: '100px' }}>
                                <b>Additional:</b> Full time, remote working
                            </p>
                        </Block>

                        <Block
                            background="dark"
                            icon="🐱‍"
                            onEdit={openDialog}
                            onRemove={console.log}
                            small="Jun 4 2020 at 5:35 am"
                            styled
                            title="SFXDX, Kaliningrad"
                        >
                            <p>
                                <b>Stack:</b> react, typescript, mobx, unit-tests
                            </p>
                            <p>
                                <b>Salary:</b> from 70 000 after taxes
                            </p>

                            <p>
                                <b>Contacts:</b> https://t.me/someone
                            </p>
                            <p className="scrollable" style={{ maxHeight: '100px' }}>
                                <b>Additional:</b> Full time, remote working
                            </p>
                        </Block>
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
                </>
            )}

            <ScheduleDialog
                closeDialog={closeDialog}
                isOpen={dialogIsOpen}
                onSubmit={console.log}
            />
        </BaseLayout>
    );
};
