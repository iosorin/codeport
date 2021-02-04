import React, { FC } from 'react';
import { CompletedScheduleEvent } from 'types';
import { Button, Event } from '@/library/.ui';
import { date } from '@/library/utils';

type Props = {
    details: CompletedScheduleEvent;
    startEdit: () => void;
};

export const DetailsEntry: FC<Props> = ({ details, startEdit }) => {
    return (
        <>
            <div>
                <div className="h2 text-bold mb-1">Details</div>

                <Event details={details} showDate={false} small />
            </div>

            <div className="my-2">
                <div className="h2 text-bold mb-1">Rating</div>
                <div>{details.rating} / 10</div>
            </div>

            <div className="mt-auto flex-between">
                <h3>
                    {details.time} min. <br /> {date.when(details.date)}
                </h3>

                <Button background="primary" onClick={startEdit}>
                    Edit
                </Button>
            </div>
        </>
    );
};
