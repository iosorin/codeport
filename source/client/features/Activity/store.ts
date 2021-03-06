import { makeAutoObservable } from 'mobx';
import { CompletedScheduleEvent, EventWithID, ScheduleEvent } from 'types';
import { api } from './api';

type WithID = EventWithID<ScheduleEvent>;
type ActivityEventOrNull = CompletedScheduleEvent | null | undefined;

class ActivityStore {
    events: CompletedScheduleEvent[] = [];

    dialogIsVisible = false;

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

    setEvents = (events: CompletedScheduleEvent[]) => {
        this.events = events;
    };

    markLoading = (loading: boolean) => {
        this.loading = loading;
    };

    setDialogEvent = (dialogEvent: ActivityEventOrNull = null) => {
        this.dialogEvent = dialogEvent;
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

    call = (apiMethod: () => Promise<CompletedScheduleEvent[]>) => {
        this.markLoading(true);

        apiMethod()
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

    updateEvent = (event: WithID) => {
        this.call(api.update.bind(null, event));
    };

    removeEvent = (id: string | number) => {
        this.call(api.delete.bind(null, id));
    };
}

const store = new ActivityStore();

type Store = typeof store;

export { Store, WithID as EventWithID };

export default store;
