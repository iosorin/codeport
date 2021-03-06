import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ScheduleHead, ScheduleList } from '../organisms';
import { ScheduleStoreType } from '../../store';

type Props = {
    store: ScheduleStoreType;
};

export const ScheduleTemplate: FC<Props> = observer(({ store }) => {
    return (
        <>
            <ScheduleHead
                today={store.today}
                total={store.events.length}
                openDialog={store.openDialog}
            />

            <ScheduleList store={store} />
        </>
    );
});
