import React, { FC } from 'react';
import { ScheduleStoreType } from '../../../store';
import { observer } from 'mobx-react-lite';
import { ScheduleListItem } from './ScheduleListItem';

type Props = {
    store: ScheduleStoreType;
    expired?: boolean;
};

export const ScheduleList: FC<Props> = observer(({ store, expired }) => {
    const list = expired ? store.expired : store.active;

    return list.size ? (
        <div className={`mb-3 ${expired ? 'hoverable default' : ''}`}>
            {[...list].map(([day, events]) => (
                <div key={day} className="mb-2">
                    <div className="text-accent mb-2">
                        {day} ({events.length})
                    </div>

                    <div className="flex-col">
                        {events.map((event) => (
                            <div className="mb-2">
                                <ScheduleListItem
                                    details={event}
                                    updateEvent={store.updateEvent}
                                    toggleDialog={store.toggleDialog}
                                    toggleConfirmDialog={store.toggleConfirmDialog}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    ) : null;
});
