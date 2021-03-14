import React, { FC } from 'react';
import { Calendar } from '@ui';
import { observer } from 'mobx-react-lite';
import { date } from '@/library/utils';
import { ScheduleStoreType } from '../../store';

type Props = {
    store: ScheduleStoreType;
};

export const ScheduleCalendar: FC<Props> = observer(({ store }) => {
    const isPastDay = (day: number) => date.fixed(day) < date.fixed();

    const markedDays = store.events.map((event) => ({
        date: event.date,
        style: {
            background: event.color,
        },
    }));

    const openMarkedDay = (day: number) => {
        const target = store.events.find((event) => date.match(event.date, day)) ?? { date: day };

        store.toggleDialog(target, true);
    };

    return (
        <Calendar
            dark
            disableDates={isPastDay}
            onClickDate={openMarkedDay}
            markedDays={markedDays}
        />
    );
});
