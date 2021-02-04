import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { DetailsForm } from './DetailsForm';
import { DetailsEntry } from './DetailsEntry';

type Props = {
    details: CompletedScheduleEvent;
    setDetails: (details: ScheduleEvent) => void;
};

export const Details: FC<Props> = observer(({ details, setDetails }) => {
    const [edit, setEdit] = useState(false);

    return (
        <div className="flex-col flex-1">
            {edit ? (
                <DetailsForm
                    details={details}
                    onCancel={() => setEdit(false)}
                    onSubmit={setDetails}
                />
            ) : (
                <DetailsEntry details={details} startEdit={() => setEdit(true)} />
            )}
        </div>
    );
});
