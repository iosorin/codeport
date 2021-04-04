import React, { FC } from 'react';
import { Block, Colors, Event } from '@ui';
import { observer } from 'mobx-react-lite';
import { ParamRequired, ScheduleEvent, ScheduleEventStrict } from 'types';

import { date } from '@/library/utils';

type Props = {
    details: ScheduleEventStrict;
    updateEvent: (event: ParamRequired<ScheduleEvent, 'id'>) => void;
    toggleDialog: (event: ScheduleEvent) => void;
    toggleConfirmDialog: (event: ScheduleEvent) => void;
};

export const ScheduleListItem: FC<Props> = observer(
    ({ details, updateEvent, toggleDialog, toggleConfirmDialog }) => {
        return (
            <Block
                key={details.id}
                background="dark"
                onEdit={() => toggleDialog(details)}
                onRemove={() => toggleConfirmDialog(details)}
                title={details.title}
                size="large"
                small={<div className="h4 mt-xs">{date.when(details.date, true, false)}</div>}
            >
                <Colors
                    active={details.color}
                    onChange={(color) => updateEvent({ id: details.id, color })}
                    trigger="line"
                />

                <Event details={details} date={false} showEmpty />
            </Block>
        );
    }
);
