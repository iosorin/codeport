import React, { FC } from 'react';
import { Block, Colors, Event } from '@ui';
import { observer } from 'mobx-react-lite';
import type { ScheduleEvent } from 'types';
import { date } from '@/library/utils';

type Props = {
    details: ScheduleEvent;
    updateEvent: (event: ScheduleEvent) => void;
    toggleDialog: (event: ScheduleEvent) => void;
    toggleConfirmDialog: (event: ScheduleEvent) => void;
};

export const ScheduleListItem: FC<Props> = observer(
    ({ details, updateEvent, toggleDialog, toggleConfirmDialog }) => {
        return (
            <Block
                key={details.id}
                size="large"
                title={details.title}
                background="dark"
                onEdit={() => toggleDialog(details)}
                onRemove={() => toggleConfirmDialog(details)}
                small={<div className="h4 mt-xs">{date.when(details.date, true, false)}</div>}
            >
                <Colors
                    trigger="line"
                    active={details.color}
                    onChange={(color) => updateEvent({ ...details, color })}
                />

                <Event details={details} date={false} showEmpty />
            </Block>
        );
    }
);
