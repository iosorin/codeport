import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import {
    Button,
    Color,
    Dialog,
    Snippets,
    EventForm,
    Event,
    Block,
    Colors,
    Input,
    Range,
} from '@ui';
import { date } from '@/library/utils';

type Props = {
    isVisible: boolean;
    details: CompletedScheduleEvent | null;
    setDetails: (details: ScheduleEvent) => void;
    close: () => void;
};

export const EventDialog: FC<Props> = observer(({ isVisible, close, details, setDetails }) => {
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [isBodyEditing, setIsBodyEditing] = useState(false);

    if (!details) return null;

    const submit = (action: () => void) => {
        setIsTitleEditing(false);
        setIsBodyEditing(false);

        action();
    };

    const title = (
        <Block
            background="black"
            onClick={() => {
                setIsBodyEditing(false);
                setIsTitleEditing(true);
            }}
        >
            <div className="flex-start">
                <Colors
                    type="button"
                    active={details.color}
                    onChange={(color) => setDetails({ color })}
                    trigger={<Color color={details.color} size="large"></Color>}
                />

                <div className="h3 text-accent ml-1 mb-0">
                    {details.title} ({details.rating} / 10)
                </div>
            </div>
        </Block>
    );

    const body = (
        <>
            {isBodyEditing ? (
                <EventForm
                    details={details}
                    completed
                    onSubmit={(updated) => submit(() => setDetails(updated))}
                    onCancel={() => setIsBodyEditing(false)}
                    align="end"
                    exclude={['title', 'rating', 'color']}
                />
            ) : (
                <Block
                    background="black"
                    onClick={() => {
                        setIsTitleEditing(false);
                        setIsBodyEditing(true);
                    }}
                >
                    <Event details={details} date={false} accent />
                </Block>
            )}
        </>
    );

    return (
        details && (
            <Dialog
                close={close}
                isVisible={isVisible}
                size="fullscreen"
                title={!isTitleEditing && title}
            >
                <div className="flex">
                    <div className="flex-col flex-1">
                        {isTitleEditing && (
                            <div className="flex-50 mb-2">
                                <EventForm
                                    details={details}
                                    completed
                                    onSubmit={(updated) => submit(() => setDetails(updated))}
                                    onCancel={() => setIsTitleEditing(false)}
                                    align="end"
                                    exclude={['main']}
                                />
                            </div>
                        )}
                        <div className="mr-1">{body}</div>
                    </div>

                    <div className="flex-1 mb-1">
                        <Snippets snippets={details.snippets} />
                    </div>
                </div>

                <hr className="my-2"></hr>

                <div className="flex-between">
                    <div className="h4 text-accent">{date.when(details.date)}</div>
                    <div className="h4 text-accent">{details.time} min.</div>
                </div>
            </Dialog>
        )
    );
});
