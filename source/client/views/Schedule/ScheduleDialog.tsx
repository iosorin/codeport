import React, { FC } from 'react';
import { Input, Dialog, Button, Textarea } from '@ui';
import { date } from '@/library/utils';
import { ScheduleEvent } from 'types';

type Props = {
    event: ScheduleEvent | null;
    isOpen: boolean;
    closeDialog: () => void;
    onSubmit: () => void;
};

export const ScheduleDialog: FC<Props> = ({ event, isOpen, closeDialog, onSubmit }) => {
    return (
        <Dialog close={closeDialog} isVisible={isOpen} size="large" title="Schedule a conference">
            <div className="flex-col">
                <Input
                    label="Title"
                    onChange={console.log}
                    placeholder="company / candidate"
                    value={event?.title}
                />

                <Input
                    label="Date"
                    onChange={console.log}
                    type="datetime-local"
                    value={date.input(event?.date)}
                />

                <Input
                    label="Stack"
                    onChange={console.log}
                    placeholder="react, typescript, mobx, unit-tests"
                    value={event?.stack}
                />

                <Input
                    label="Salary"
                    onChange={console.log}
                    placeholder="from 70 000 after taxes"
                    value={event?.salary}
                />

                <Input
                    label="Contacts"
                    onChange={console.log}
                    placeholder="https://t.me/someone"
                    value={event?.contacts}
                />

                <Textarea
                    label="Additional"
                    onChange={console.log}
                    placeholder="location, work format"
                    value={event?.additional}
                />

                <Button background="success" className="mt-xs" onClick={onSubmit} size="large">
                    Save
                </Button>
            </div>
        </Dialog>
    );
};
