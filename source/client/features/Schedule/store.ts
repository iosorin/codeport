import { makeAutoObservable } from 'mobx';
import { ScheduleEvent, ScheduleEventStrict } from 'types';
import { date, debounce } from '@/library/utils';
import { api } from './api';

type ScheduleEventOrNull = ScheduleEvent | null | undefined;

class ScheduleStore {
    events: ScheduleEventStrict[] = [];

    dialogIsVisible = false;

    dialogEvent: ScheduleEventOrNull = null;

    constructor() {
        makeAutoObservable(this);
    }

    get empty() {
        return !this.events.length;
    }

    get sorted() {
        return [...this.events].sort((a, b) => a.date - b.date);
    }

    get todayEvents() {
        return this.events.filter((event) => date.match(event.date));
    }

    toggleDialog = (visible = !this.dialogIsVisible) => {
        this.dialogIsVisible = visible;
    };

    setDialogEvent = (dialogEvent: ScheduleEventOrNull = null) => {
        this.dialogEvent = dialogEvent;
    };

    updateDialogEvent = (props: ScheduleEvent) => {
        this.setDialogEvent({ ...this.dialogEvent, ...props });
    };

    setEvents = (events: ScheduleEventStrict[]) => {
        this.events = events;
    };

    fetchEvents = () => {
        return api.get().then(this.setEvents);
    };

    createEvent = (event: ScheduleEvent) => {
        if (!event.date) event.date = Date.now();

        return api.create(event).then(debounce(this.setEvents));
    };

    updateEvent = (event: ScheduleEvent) => {
        return api.update(event).then(debounce(this.setEvents));
    };

    removeEvent = (event: ScheduleEventStrict) => {
        return api.delete(event.id).then(this.setEvents);
    };
}

const store = new ScheduleStore();

export type ScheduleStoreType = typeof store;

export default store;
