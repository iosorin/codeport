import { makeAutoObservable } from 'mobx';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { api } from './api';

type ActivityEventOrNull = CompletedScheduleEvent | null | undefined;
export type EventWithID = ScheduleEvent & { id: string | number };

class ActivityStore {
    events: CompletedScheduleEvent[] = [];

    dialogIsVisible = true;

    confirmDialogIsVisible = false;

    isFetching = false;

    isLoading = false;

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

    setEvents = (events: CompletedScheduleEvent[]) => {
        this.events = events;
    };

    markFetching = (fetching: boolean) => {
        this.isFetching = fetching;
    };

    markLoading = (loading: boolean) => {
        this.isLoading = loading;
    };

    setDialogEvent = (dialogEvent: ActivityEventOrNull = null) => {
        this.dialogEvent = dialogEvent;
    };

    removeEvent = (id: string | number) => {
        this.setEvents(this.events.filter((event) => event.id !== id));
    };

    toggleDialog = (event?: CompletedScheduleEvent | null) => {
        this.setDialogEvent(event);

        this.dialogIsVisible = Boolean(event);
    };

    toggleConfirmDialog = (event?: CompletedScheduleEvent | null) => {
        this.setDialogEvent(event);

        this.confirmDialogIsVisible = Boolean(event);
    };

    updateDialogEvent = (updated: ScheduleEvent) => {
        if (!this.dialogEvent) return;

        this.setDialogEvent({ ...this.dialogEvent, ...updated });

        this.updateEvent(this.dialogEvent);
    };

    fetchEvents = () => {
        this.markFetching(true);

        api.get()
            .then((events) => {
                this.setEvents(events);
                this.setDialogEvent(events[0]);
            })
            .finally(() => {
                this.markFetching(false);
            });
    };

    updateEvent = (event: EventWithID) => {
        this.markLoading(true);

        api.update(event)
            .then((events) => {
                this.setEvents(events);
            })
            .finally(() => {
                setTimeout(() => {
                    this.markLoading(false);
                }, 1000);
            });
    };
}

const store = new ActivityStore();

export type Store = typeof store;

export default store;
