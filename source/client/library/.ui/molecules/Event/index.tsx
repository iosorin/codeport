import React, { FC } from 'react';
import { ScheduleEvent } from 'types';
import { date } from '@/library/utils';

type Props = {
    details: ScheduleEvent;
    showEmpty?: boolean;
    inline?: boolean;
};

export const Event: FC<Props> = ({ details, showEmpty, inline }) => {
    const Tagname = inline ? 'span' : 'p';

    const empty = <span className="text-grey">-</span>;

    const map = [
        {
            label: 'Date',
            value: date.when(details.date),
        },
        {
            label: 'Stack',
            value: details.stack,
        },
        {
            label: 'Salary',
            value: details.salary,
        },
        {
            label: 'Contacts',
            value: details.contacts,
        },
    ];

    return (
        <>
            {map.map((detail, index) => {
                const show = showEmpty || detail.value;

                return (
                    show && (
                        <Tagname key={index}>
                            {inline ? detail.label : <b>{detail.label}</b>}:&nbsp;
                            {detail.value || (showEmpty && empty)}
                            {inline && ';'}&nbsp;
                        </Tagname>
                    )
                );
            })}

            {!inline && (showEmpty || details.additional) && (
                <Tagname className="scrollable" style={{ maxHeight: '90px' }}>
                    <b>Additional</b>:&nbsp; {details.additional || empty}
                </Tagname>
            )}
        </>
    );
};
