import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { Button, Color, Dialog, Snippets, EventForm, Event, Block } from '@ui';
import { date } from '@/library/utils';

type Props = {
    isVisible: boolean;
    details: CompletedScheduleEvent | null;
    setDetails: (details: ScheduleEvent) => void;
    close: () => void;
};

export const EventDialog: FC<Props> = observer(({ isVisible, close, details, setDetails }) => {
    const [isEditing, setIsEditing] = useState(false);

    if (!details) return null;

    const title = (
        <div className="flex-start">
            <Color color={details.color} />

            <div className="h3 text-accent mx-1 mb-0">{details.title}</div>
        </div>
    );

    const event = (
        <>
            {isEditing ? (
                <Block background="light">
                    <EventForm details={details} onSubmit={console.log} completed />
                </Block>
            ) : (
                <Block onEdit={() => setIsEditing(true)} background="light">
                    <Event details={details} showDate={false} accent showRating />
                </Block>
            )}
        </>
    );

    const buttons = (
        <>
            {isEditing ? (
                <div>
                    <Button background="success" onClick={() => setIsEditing(false)} zoom>
                        Save
                    </Button>

                    <Button
                        background="light"
                        color="black"
                        className="ml-1"
                        onClick={() => setIsEditing(false)}
                        zoom
                    >
                        Cancel
                    </Button>
                </div>
            ) : (
                <div>
                    {/* <Button
                        background="primary"
                        color="white"
                        zoom
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button> */}
                </div>
            )}
        </>
    );

    return (
        details && (
            <Dialog close={close} isVisible={isVisible} size="fullscreen" title={title}>
                <div className="flex mb-1">
                    <div className="flex-1 mr-1">{event}</div>

                    <div className="flex-1 ml-1">
                        <Snippets snippets={details.snippets} />
                    </div>
                </div>

                <hr className="my-2"></hr>

                <div className="flex-between">
                    <div className="h4 text-accent">{date.when(details.date)}</div>
                    <div className="h4 text-accent">{details.time} min.</div>
                    {/* {buttons} */}
                </div>
            </Dialog>
        )
    );
});
