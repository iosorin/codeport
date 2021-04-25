import React, { FC, FormEvent, useState } from 'react';
import { ActivityEvent, NewEvent, ScheduleEvent } from 'types';
import { EVENT_COLOR } from 'defaults';
import { Input, Textarea, Colors, Button, Emojis } from '@ui';
import { date } from '@/library/utils';

type Event = Partial<ActivityEvent>;
type EventOrNull = Event | null | undefined;

type Props = {
    details: EventOrNull;
    completed?: boolean;
    align?: 'start' | 'center' | 'end';
    exclude?: ('title' | 'rating' | 'color' | 'date' | 'main')[];
    onSubmit: (event: Event) => void | Promise<any>;
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
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<EventOrNull>({ ...source });

    const showTitle = !exclude?.includes('title');
    const showColor = !exclude?.includes('color');
    const showMain = !exclude?.includes('main');
    const showDate = !completed && !exclude?.includes('date');
    const showRating = completed && !exclude?.includes('rating');

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!details) return;

        setLoading(true);

        try {
            await onSubmit(details);
        } finally {
            setLoading(false);
        }
    };

    const set = (event: Event) => {
        setDetails({ ...details, ...event });
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="flex-col">
                {showColor && (
                    <Colors
                        active={details?.color ?? EVENT_COLOR}
                        onChange={(color) => set({ color })}
                        size="small"
                    />
                )}

                {showTitle && (
                    <Input
                        label="Title"
                        onChange={(e) => set({ title: e.currentTarget.value })}
                        placeholder="company / candidate"
                        value={details?.title}
                        required
                    />
                )}

                {showRating && (
                    <div>
                        <Emojis
                            label="Rating"
                            onChange={(rating: number) => set({ rating })}
                            value={details?.rating}
                        />
                    </div>
                )}

                {showDate && (
                    <Input
                        label="Date"
                        onChange={(e) =>
                            set({
                                date: new Date(e.currentTarget.value).getTime(),
                            })
                        }
                        type="datetime-local"
                        min={date.input(Date.now())}
                        value={date.input(details?.date)}
                    />
                )}
                {showMain && (
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
                        loading={loading}
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
