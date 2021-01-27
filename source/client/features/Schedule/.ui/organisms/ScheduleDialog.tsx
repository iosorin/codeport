import React, { FC, FormEvent, useState } from 'react';
import { Input, Dialog, Button, Textarea } from '@ui';
import { date } from '@/library/utils';
import { ScheduleEvent } from 'types';
import { ScheduleStoreType } from '../../store';
import { observer } from 'mobx-react-lite';

type Props = {
    store: ScheduleStoreType;
    closeDialog: () => void;
};

export const ScheduleDialog: FC<Props> = observer(({ store, closeDialog }) => {
    const [isLoading, setisLoading] = useState(false);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!store.dialogEvent) return;

        setisLoading(true);
        try {
            const action = store.dialogEvent.id ? store.updateEvent : store.createEvent;

            await action(store.dialogEvent);

            setTimeout(() => {
                closeDialog();
            }, 100);
        } finally {
            setisLoading(false);
        }
    };

    return (
        <Dialog close={closeDialog} isVisible={store.dialogIsVisible} title="Schedule event">
            <form onSubmit={submitHandler}>
                <div className="flex-col">
                    <Input
                        label="Title"
                        onChange={(e) => store.updateDialogEvent({ title: e.currentTarget.value })}
                        placeholder="company / candidate"
                        value={store.dialogEvent?.title}
                        required
                    />

                    <Input
                        label="Date"
                        onChange={(e) =>
                            store.updateDialogEvent({
                                date: new Date(e.currentTarget.value).getTime(),
                            })
                        }
                        type="datetime-local"
                        value={date.input(store.dialogEvent?.date)}
                        min={date.input(Date.now())}
                    />

                    <Input
                        label="Stack"
                        onChange={(e) => store.updateDialogEvent({ stack: e.currentTarget.value })}
                        placeholder="react, typescript, mobx, unit-tests"
                        value={store.dialogEvent?.stack}
                    />

                    <Input
                        label="Salary"
                        onChange={(e) => store.updateDialogEvent({ salary: e.currentTarget.value })}
                        placeholder="from 70 000 after taxes"
                        value={store.dialogEvent?.salary}
                    />

                    <Input
                        label="Contacts"
                        onChange={(e) =>
                            store.updateDialogEvent({ contacts: e.currentTarget.value })
                        }
                        placeholder="https://t.me/someone"
                        value={store.dialogEvent?.contacts}
                    />

                    <Textarea
                        label="Additional"
                        onChange={(e) =>
                            store.updateDialogEvent({ additional: e.currentTarget.value })
                        }
                        placeholder="location, work format"
                        value={store.dialogEvent?.additional}
                    />

                    <Button
                        background="success"
                        className="mt-xs"
                        size="large"
                        loading={isLoading}
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Dialog>
    );
});
