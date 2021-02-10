import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { Color, Dialog, Snippets, EventForm, Event, Block } from '@ui';
import { date } from '@/library/utils';

type Props = {
    isVisible: boolean;
    details: CompletedScheduleEvent | null;
    setDetails: (details: ScheduleEvent) => void;
    close: () => void;
};

export const EventDialog: FC<Props> = observer(({ isVisible, details, setDetails, close }) => {
    const [isBodyEditing, setIsBodyEditing] = useState(false);
    const [isTitleEditing, setIsTitleEditing] = useState(false);

    if (!details) return null;

    const title = isTitleEditing ? (
        <div className="flex-50">
            <EventForm
                details={details}
                completed
                onSubmit={(updated) => {
                    setDetails(updated);
                    setIsTitleEditing(false);
                }}
                onCancel={() => setIsTitleEditing(false)}
                align="end"
                exclude={['main']}
            />
        </div>
    ) : (
        <Block
            background="grey"
            onClick={() => {
                setIsTitleEditing(true);
                setIsBodyEditing(false);
            }}
        >
            <div className="flex-start">
                {/* <Colors
                    type="button"
                    active={details.color}
                    onChange={(color) => setDetails({ color })}
                    trigger={<Color color={details.color} size="large"></Color>}
                /> */}
                <Color color={details.color} size="large"></Color>

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
                    onSubmit={(updated) => {
                        return new Promise((resolve) => {
                            resolve(setDetails(updated));
                            setIsBodyEditing(false);
                        });
                    }}
                    onCancel={() => {
                        setIsBodyEditing(false);
                    }}
                    align="end"
                    exclude={['title', 'rating', 'color']}
                />
            ) : (
                <Block
                    background="grey"
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
            <Dialog close={close} isVisible={isVisible} size="fullscreen" title={title}>
                <div className="flex mb-1">
                    <div className="flex-1 mr-1">{body}</div>

                    <div className="flex-1 ml-1">
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
