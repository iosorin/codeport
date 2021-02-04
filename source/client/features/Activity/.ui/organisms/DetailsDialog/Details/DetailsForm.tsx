import React, { FC } from 'react';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { Input, Textarea, Button, Colors, Range } from '@/library/.ui';

type Props = {
    details: CompletedScheduleEvent;
    onSubmit: (details: ScheduleEvent) => void;
    onCancel: () => void;
};

export const DetailsForm: FC<Props> = ({ details, onSubmit, onCancel }) => {
    return (
        <>
            <Input
                dark
                onChange={(e) => onSubmit({ title: e.currentTarget.value })}
                value={details.title}
            />

            <Colors active={details.color} onChange={(color) => onSubmit({ color })} />

            <Input
                dark
                label="Stack"
                onChange={(e) => onSubmit({ stack: e.currentTarget.value })}
                placeholder="react, typescript, mobx, unit-tests"
                value={details.stack}
            />

            <Input
                dark
                label="Salary"
                onChange={(e) => onSubmit({ salary: e.currentTarget.value })}
                placeholder="from 70 000 after taxes"
                value={details.salary}
            />

            <Input
                dark
                label="Contacts"
                onChange={(e) => onSubmit({ contacts: e.currentTarget.value })}
                placeholder="https://t.me/someone"
                value={details.contacts}
            />

            <Textarea
                dark
                label="Additional"
                onChange={(e) => onSubmit({ additional: e.currentTarget.value })}
                placeholder="location, work format"
                value={details.additional}
            />

            <Range
                dark
                max={10}
                min={0}
                onChange={(rating) => onSubmit({ rating })}
                step={0.1}
                units=" / 10"
                value={details.rating}
            />

            <div className="flex-end">
                {/* <Button
                    background="success"
                    color="black"
                    onClick={onSubmit({})}
                    shadow="light"
                    size="small"
                >
                    Update
                </Button> */}

                <Button
                    background="light"
                    className="ml-1"
                    color="black"
                    onClick={onCancel}
                    shadow="light"
                    size="small"
                >
                    Cancel
                </Button>
            </div>
        </>
    );
};
