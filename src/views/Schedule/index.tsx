import React, { FC, useState } from 'react';
import { BaseLayout } from '@layouts';
import { Block, Button } from '@/library/.ui';
import { ScheduleDialog } from './ScheduleDialog';
import { Plus } from 'react-feather';

// title, date, stack, salary, work_format, contacts

export const Schedule: FC = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);

    return (
        <BaseLayout>
            <h1>Schedule</h1>

            {false ? (
                <div className="container">
                    <h3 className="text-grey">The list of scheduled conferences is empty.</h3>

                    <Button className="mt-2" onClick={openDialog} primary size="large">
                        Schedule a new conference
                    </Button>
                </div>
            ) : (
                <div className="flex flex-1">
                    <div className="grid flex-1">
                        <Block
                            background="light"
                            icon="🐱‍"
                            onEdit={openDialog}
                            size="large"
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
                                <b>Work format:</b> Full time, remote working
                            </p>
                            <p>
                                <b>Contact information:</b> https://t.me/someone
                            </p>
                        </Block>
                    </div>

                    <Button
                        className="mt-auto ml-auto"
                        onClick={openDialog}
                        primary
                        rounded
                        size="large"
                    >
                        <Plus />
                    </Button>
                </div>
            )}

            <ScheduleDialog
                closeDialog={closeDialog}
                isOpen={dialogIsOpen}
                onSubmit={console.log}
            />
        </BaseLayout>
    );
};
