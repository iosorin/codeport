import React, { FC, useState } from 'react';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { Color, Dialog, Snippets, EventForm, Event, Block, Colors } from '@ui';
import { date } from '@/library/utils';
import { mapList } from 'utils';

type Props = {
    isVisible: boolean;
    isLoading?: boolean;
    details: CompletedScheduleEvent | null;
    setDetails: (details: ScheduleEvent) => void;
    close: () => void;
};

export const EventDialog: FC<Props> = ({ isVisible, isLoading, details, setDetails, close }) => {
    const [isBodyEditing, setIsBodyEditing] = useState(false);

    if (!details) return null;

    const title = (
        <>
            <div className="flex-start">
                <div className="h3 text-accent mr-1 mb-0">
                    {details.title} ({details.rating} / 10)
                </div>

                <Colors
                    active={details.color}
                    onChange={(color) => setDetails({ color })}
                    type="single"
                    size="large"
                ></Colors>
            </div>
        </>
    );

    const body = (
        <>
            {isBodyEditing ? (
                <EventForm
                    details={details}
                    completed
                    onSubmit={(updated) => {
                        setDetails(updated);
                        setIsBodyEditing(false);
                    }}
                    onCancel={() => {
                        setIsBodyEditing(false);
                    }}
                    align="end"
                    exclude={['color']}
                />
            ) : (
                <Block
                    background="none"
                    onClick={() => {
                        setIsBodyEditing(true);
                    }}
                >
                    <Event details={details} date={false} accent />
                </Block>
            )}
        </>
    );

    return details ? (
        <Dialog close={close} isVisible={isVisible} size="fullscreen" title={title}>
            <div className="flex mb-1">
                <div className="flex-1 mr-1">{body}</div>

                <div className="flex-1 ml-1">
                    <Snippets
                        loading={isLoading}
                        snippets={details.snippets}
                        onSave={(snippet) =>
                            setDetails({ snippets: mapList(details.snippets, snippet) })
                        }
                    />
                </div>
            </div>

            <hr className="my-3"></hr>

            <div className="flex-between">
                <div className="h4 text-accent">{date.when(details.date)}</div>
                <div className="h4 text-accent">{details.time} min.</div>
            </div>
        </Dialog>
    ) : null;
};
