import React, { FC } from 'react';
import { Block, Event } from '@ui';
import { ScheduleStoreType } from '../../../store';
import { observer } from 'mobx-react-lite';

type Props = {
    store: ScheduleStoreType;
};

export const ScheduleList: FC<Props> = observer(({ store }) => {
    return (
        <div className="fill">
            {[...store.grouped].map(([date, events]) => (
                <div key={date}>
                    <p className="text-accent mb-1">
                        {date} ({events.length})
                    </p>

                    <div className="grid flex-1">
                        {events.map((event) => (
                            <Block
                                key={event.id}
                                background="black"
                                onEdit={() => store.toggleDialog(event)}
                                onRemove={() => store.toggleConfirmDialog(event)}
                                styled
                                title={event.title}
                                height="220px"
                                customBackground={event.color}
                            >
                                <Event details={event} />
                            </Block>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
});
