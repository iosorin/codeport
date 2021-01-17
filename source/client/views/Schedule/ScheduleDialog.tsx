import React, { FC } from 'react';
import { Input, Dialog, Button, Textarea } from '@ui';

type Props = {
    isOpen: boolean;
    closeDialog: () => void;
    onSubmit: () => void;
};

export const ScheduleDialog: FC<Props> = ({ isOpen, closeDialog, onSubmit }) => {
    return (
        <Dialog close={closeDialog} isVisible={isOpen} size="large" title="Schedule a conference">
            <div className="flex-col">
                <Input label="Title" onChange={console.log} placeholder="company / candidate" />

                <Input label="Date" onChange={console.log} type="datetime-local" />

                <Input
                    label="Stack"
                    onChange={console.log}
                    placeholder="react, typescript, mobx, unit-tests"
                />

                <Input
                    label="Salary"
                    onChange={console.log}
                    placeholder="from 70 000 after taxes"
                />
                <Input label="Contacts" onChange={console.log} placeholder="https://t.me/someone" />

                <Textarea
                    label="Additional"
                    onChange={console.log}
                    placeholder="location, work format"
                />

                <Button background="success" className="mt-xs" onClick={onSubmit} size="large">
                    Save
                </Button>
            </div>
        </Dialog>
    );
};
