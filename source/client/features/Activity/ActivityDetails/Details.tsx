import React from 'react';
import { Block } from '@/library/.ui';

export const Details = () => {
    return (
        <div className="flex-col">
            <div className="flex-col " onClick={() => !edit && setedit(true)}>
                <Block controlsInBottom height="315px" hover size="small">
                    {edit ? form() : <Event details={details} showDate={false} showRating />}
                </Block>
            </div>

            <div className="flex-between mt-2">
                {rating()}

                <div className="flex-col text-right">
                    <div className="h2">{details.time} min.</div>
                    <div className="h2">{date.when(details.date)}</div>
                </div>
            </div>
        </div>
    );
};
