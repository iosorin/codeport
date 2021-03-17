import { makeAutoObservable } from 'mobx';
import { ScheduleEvent, ScheduleEventStrict, ParamRequired } from 'types';
import { date, groupBy, randomEventColor } from '@/library/utils';
import { api } from './api';

type ScheduleEventOrNull = ScheduleEvent | null | undefined;

class ScheduleStore {
    events: ScheduleEventStrict[] = [];

    dialogVisible = false;

    confirmDialogVisible = false;

    dialogEvent: ScheduleEventOrNull = null;

    constructor() {
        makeAutoObservable(this);
    }

    get empty() {
        return !this.events.length;
    }

    get active() {
        return this.group(
            [...this.events]
                .sort((a, b) => a.date - b.date)
                .filter((event) => event.date >= Date.now())
        );
    }

    get expired() {
        return this.group(
            [...this.events]
                .sort((a, b) => b.date - a.date)
                .filter((event) => event.date < Date.now())
        );
    }

    get today() {
        return this.active.get(date.when(Date.now(), false))?.length ?? 0;
    }

    group = (events: ScheduleEventStrict[]) =>
        groupBy<ScheduleEventStrict>(events, (event) => date.when(event.date, false));

    toggleDialog = (event?: ScheduleEventOrNull, visible?: boolean) => {
        this.setDialogEvent(event);

        this.dialogVisible = typeof visible === 'boolean' ? visible : Boolean(event);
    };

    openDialog = () => this.toggleDialog(null, true);

    toggleConfirmDialog = (event?: ScheduleEventOrNull) => {
        this.setDialogEvent(event);

        this.confirmDialogVisible = Boolean(event);
    };

    setDialogEvent = (dialogEvent: ScheduleEventOrNull = null) => {
        this.dialogEvent = dialogEvent;
    };

    updateDialogEvent = (details: ScheduleEvent) => {
        this.setDialogEvent({ ...this.dialogEvent, ...details });
    };

    setEvents = (events: ScheduleEventStrict[]) => {
        this.events = events;
    };

    fetchEvents = () => api.get().then(this.setEvents);

    createEvent = (data: ScheduleEvent) => {
        if (!data.date) data.date = date.addDays(1);
        if (!data.color) data.color = randomEventColor();

        return api.create(data).then((event) => this.setEvents([...this.events, event]));
    };

    updateEvent = (data: ParamRequired<ScheduleEvent, 'id'>) =>
        api.update(data).then((event) => this.setEvents([...this.events, event]));

    removeEvent = (id: string | number) =>
        api.delete(id).then(() => this.setEvents(this.events.filter((e) => e.id === id)));
}

const store = new ScheduleStore();

type ScheduleStoreType = typeof store;

export { ScheduleStoreType };

export default store;
