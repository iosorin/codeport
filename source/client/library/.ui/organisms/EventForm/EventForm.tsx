import React, { FC, FormEvent, useState } from 'react';
import { ScheduleEvent } from 'types';
import { Input, Textarea, Colors, Range, Button, Color, Emojis } from '@ui';
import { date } from '@/library/utils';

type ScheduleEventOrNull = ScheduleEvent | null | undefined;

type Props = {
    details: ScheduleEventOrNull;
    completed?: boolean;
    align?: 'start' | 'center' | 'end';
    exclude?: ('title' | 'rating' | 'color' | 'date' | 'main')[];
    onSubmit: (event: ScheduleEvent) => void;
    onCancel?: () => void;
};

export const EventForm: FC<Props> = ({
    details: source,
    completed,
    align = 'center',
    exclude,
    onSubmit,
    onCancel,
}) => {
    const [isLoading, setisLoading] = useState(false);
    const [details, setDetails] = useState<ScheduleEventOrNull>({ ...source });

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

    const set = (updated: ScheduleEvent) => {
        setDetails({ ...details, ...updated });
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="flex-col">
                {!exclude?.includes('color') && details?.color && (
                    <Colors active={details?.color} onChange={(color) => set({ color })} />
                )}

                {!exclude?.includes('title') && (
                    <Input
                        label="Title"
                        onChange={(e) => set({ title: e.currentTarget.value })}
                        placeholder="company / candidate"
                        value={details?.title}
                        required
                    />
                )}

                {completed && !exclude?.includes('rating') && (
                    <div>
                        <Emojis
                            label="Rating"
                            onChange={(rating: number) => set({ rating })}
                            value={details?.rating}
                        />
                    </div>
                )}

                {!completed && !exclude?.includes('date') && (
                    <Input
                        label="Date"
                        onChange={(e) =>
                            set({
                                date: new Date(e.currentTarget.value).getTime(),
                            })
                        }
                        type="datetime-local"
                        value={date.input(details?.date)}
                    />
                )}
                {!exclude?.includes('main') && (
                    <>
                        <Input
                            label="Stack"
                            onChange={(e) => set({ stack: e.currentTarget.value })}
                            placeholder="react, typescript, mobx, unit-tests"
                            value={details?.stack}
                        />

                        <Input
                            label="Salary"
                            onChange={(e) => set({ salary: e.currentTarget.value })}
                            placeholder="from 70 000 after taxes"
                            value={details?.salary}
                        />

                        <Input
                            label="Contacts"
                            onChange={(e) => set({ contacts: e.currentTarget.value })}
                            placeholder="https://t.me/someone"
                            value={details?.contacts}
                        />

                        <Textarea
                            label="Additional"
                            onChange={(e) => set({ additional: e.currentTarget.value })}
                            placeholder="location, work format"
                            value={details?.additional}
                        />
                    </>
                )}

                <div className={`flex-${align} mt-2`}>
                    <Button
                        background="success"
                        loading={isLoading}
                        type="submit"
                        size={onCancel ? 'medium' : 'large'}
                        zoom={!onCancel}
                        shadow={onCancel && 'dark'}
                        style={{ width: onCancel ? 'auto' : '100%' }}
                    >
                        Save
                    </Button>

                    {onCancel && (
                        <Button
                            background="light"
                            type="button"
                            className="ml-1"
                            shadow="dark"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
};
