import React, { FC, FormEvent, useState } from 'react';
import { ScheduleEvent } from 'types';
import { Input, Textarea, Colors, Range, Button } from '@ui';
import { date } from '@/library/utils';

type ScheduleEventOrNull = ScheduleEvent | null | undefined;

type Props = {
    details: ScheduleEventOrNull;
    completed?: boolean;
    onSubmit: (event: any) => void;
};

export const EventForm: FC<Props> = ({ details: source, completed, onSubmit }) => {
    const [isLoading, setisLoading] = useState(false);
    const [details, setDetails] = useState<ScheduleEventOrNull>(source);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!details) return;

        setisLoading(true);

        try {
            await onSubmit(details);
        } finally {
            setisLoading(false);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="flex-col">
                <Input
                    label="Title"
                    onChange={(e) => setDetails({ title: e.currentTarget.value })}
                    placeholder="company / candidate"
                    value={details?.title}
                    required
                />

                {!completed && (
                    <Input
                        label="Date"
                        onChange={(e) =>
                            setDetails({
                                date: new Date(e.currentTarget.value).getTime(),
                            })
                        }
                        type="datetime-local"
                        value={date.input(details?.date)}
                        min={date.input(Date.now())}
                    />
                )}

                <Input
                    label="Stack"
                    onChange={(e) => setDetails({ stack: e.currentTarget.value })}
                    placeholder="react, typescript, mobx, unit-tests"
                    value={details?.stack}
                />

                <Input
                    label="Salary"
                    onChange={(e) => setDetails({ salary: e.currentTarget.value })}
                    placeholder="from 70 000 after taxes"
                    value={details?.salary}
                />

                <Input
                    label="Contacts"
                    onChange={(e) => setDetails({ contacts: e.currentTarget.value })}
                    placeholder="https://t.me/someone"
                    value={details?.contacts}
                />

                <Textarea
                    label="Additional"
                    onChange={(e) => setDetails({ additional: e.currentTarget.value })}
                    placeholder="location, work format"
                    value={details?.additional}
                />

                {completed && (
                    <Range
                        label="Rating"
                        max={10}
                        min={0}
                        onChange={(rating) => setDetails({ rating })}
                        step={0.1}
                        units=" / 10"
                        value={details?.rating}
                    />
                )}

                <Colors active={details?.color} onChange={(color) => setDetails({ color })} />

                <Button
                    background="success"
                    className="mt-xs mx-auto"
                    loading={isLoading}
                    type="submit"
                    zoom
                >
                    Save
                </Button>
            </div>
        </form>
    );
};
