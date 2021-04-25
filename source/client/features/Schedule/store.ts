import { makeAutoObservable } from 'mobx';
import { ScheduleEvent, NewEvent } from 'types';
import { date, debounce, groupBy, randomEventColor } from '@/library/utils';
import { api } from './api';

type ScheduleEventOrNull = Partial<ScheduleEvent> | null | undefined;

class ScheduleStore {
    events: ScheduleEvent[] = [];

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

    group = (events: ScheduleEvent[]) =>
        groupBy<ScheduleEvent>(events, (event) => date.when(event.date, false));

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

    setEvents = (events: ScheduleEvent[]) => {
        this.events = events;
    };

    fetchEvents = () => api.get().then(this.setEvents);

    createEvent = (event: ScheduleEvent) => {
        if (!event.date) event.date = date.addDays(1);
        if (!event.color) event.color = randomEventColor();

        return api.create(event).then(debounce(this.setEvents));
    };

    updateEvent = (event: NewEvent) => api.update(event).then(debounce(this.setEvents));

    removeEvent = (id: string | number) => api.delete(id).then(this.setEvents);
}

const store = new ScheduleStore();

export type ScheduleStoreType = typeof store;

export default store;
