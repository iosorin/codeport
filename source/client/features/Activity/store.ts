import { makeAutoObservable } from 'mobx';
import { ActivityEvent, NewEvent } from 'types';
import { api } from './api';

type ActivityEventOrNull = ActivityEvent | null | undefined;

class ActivityStore {
    events: ActivityEvent[] = [];

    dialogVisible = false;

    confirmDialogVisible = false;

    loading = false;

    dialogEvent: ActivityEvent | null = null;

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

    setEvents = (events: ActivityEvent[]) => {
        this.events = events;
    };

    markLoading = (loading: boolean) => {
        this.loading = loading;
    };

    setDialogEvent = (dialogEvent: ActivityEventOrNull = null) => {
        this.dialogEvent = dialogEvent;
    };

    toggleDialog = (event?: ActivityEvent | null) => {
        this.setDialogEvent(event);

        this.dialogVisible = Boolean(event);
    };

    toggleConfirmDialog = (event?: ActivityEvent | null) => {
        this.setDialogEvent(event);

        this.confirmDialogVisible = Boolean(event);
    };

    updateDialogEvent = (updated: Partial<ActivityEvent>) => {
        if (!this.dialogEvent) return;

        this.setDialogEvent({ ...this.dialogEvent, ...updated });

        this.updateEvent(this.dialogEvent);
    };

    call = (method: () => Promise<ActivityEvent[]>) => {
        this.markLoading(true);

        method()
            .then((events) => {
                this.setEvents(events);
            })
            .finally(() => {
                this.markLoading(false);
            });
    };

    fetchEvents = () => {
        this.call(api.get);
    };

    updateEvent = (event: NewEvent) => this.call(api.update.bind(null, event));

    removeEvent = (id: string | number) => this.call(api.delete.bind(null, id));
}

const store = new ActivityStore();

type Store = typeof store;

export { Store };

export default store;
