import { makeAutoObservable } from 'mobx';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { api } from './api';

type ActivityEventOrNull = CompletedScheduleEvent | null | undefined;
export type EventWithID = ScheduleEvent & { id: string | number };

class ActivityStore {
    events: CompletedScheduleEvent[] = [];

    dialogIsVisible = true;

    confirmDialogIsVisible = false;

    loading = false;

    dialogEvent: CompletedScheduleEvent | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get empty() {
        return !this.events.length;
    }

    get total() {
        return this.events.reduce(
            (total, event) => {
                total.time += event.time;
                total.snippets += event.snippets.length;

                return total;
            },
            { time: 0, snippets: 0 }
        );
    }

    fetchEvents = async () => {
        const events = await api.get();

        this.setEvents(events);
        this.setDialogEvent(events[0]);
    };

    updateEvent = async (event: EventWithID) => {
        const events = await api.update(event);

        this.setEvents(events);
    };

    setEvents = (events: CompletedScheduleEvent[]) => {
        this.events = events;
    };

    setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    setDialogEvent = (dialogEvent: ActivityEventOrNull = null) => {
        this.dialogEvent = dialogEvent;
    };

    removeEvent = (id: string | number) => {
        this.setEvents(this.events.filter((event) => event.id !== id));
    };

    toggleDialog = (event?: CompletedScheduleEvent | null) => {
        this.setDialogEvent(event);

        this.dialogIsVisible = !!event;
    };

    toggleConfirmDialog = (event?: CompletedScheduleEvent | null) => {
        this.setDialogEvent(event);

        this.confirmDialogIsVisible = !!event;
    };

    updateDialogEvent = (updated: ScheduleEvent) => {
        if (!this.dialogEvent) return;

        this.setDialogEvent({ ...this.dialogEvent, ...updated });

        this.updateEvent(this.dialogEvent);
    };
}

const store = new ActivityStore();

export type Store = typeof store;

export default store;
