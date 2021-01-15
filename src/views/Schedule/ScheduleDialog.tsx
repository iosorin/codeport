import React, { FC } from 'react';
import { Input, Dialog, Button } from '@ui';

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

                <Input
                    label="Work format"
                    onChange={console.log}
                    placeholder="Full time, remote working"
                />

                <Input
                    label="Contact information"
                    onChange={console.log}
                    placeholder="https://t.me/someone"
                />

                <Button className="mt-1" onClick={onSubmit} size="large" success>
                    Save
                </Button>
            </div>
        </Dialog>
    );
};
