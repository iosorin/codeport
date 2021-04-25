import React, { FC, useEffect, useState } from 'react';
import { ActivityEvent, ScheduleEvent } from 'types';
import { Dialog, Snippets, EventForm, Event, Block, Colors } from '@ui';
import { date } from '@/library/utils';
import { mergeItem } from 'utils';

type Props = {
    visible: boolean;
    loading?: boolean;
    details: ActivityEvent | null;
    setDetails: (details: Partial<ActivityEvent>) => void;
    close: () => void;
};

export const ActivityDialog: FC<Props> = ({ visible, loading, details, setDetails, close }) => {
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (!visible) setEditing(false);
    }, [visible]);

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
                    trigger="color"
                />
            </div>
        </>
    );

    const body = (
        <>
            {editing ? (
                <EventForm
                    details={details}
                    completed
                    onSubmit={(updated) => {
                        setDetails(updated);
                        setEditing(false);
                    }}
                    onCancel={() => {
                        setEditing(false);
                    }}
                    align="end"
                    exclude={['color']}
                />
            ) : (
                <Block
                    size="small"
                    background="light"
                    hover
                    onClick={() => {
                        setEditing(true);
                    }}
                >
                    <Event details={details} date={false} accent showEmpty small />
                </Block>
            )}
        </>
    );

    return details ? (
        <Dialog close={close} visible={visible} size="fullscreen" title={title}>
            <div className="flex mb-1">
                <div className="flex-1 mr-1">{body}</div>

                <div className="flex-1 ml-1">
                    <Snippets
                        loading={loading}
                        snippets={details.snippets}
                        onSave={(snippet) =>
                            setDetails({ snippets: mergeItem(details.snippets, snippet) })
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
