import { makeAutoObservable } from 'mobx';
import { ScheduleEvent, ScheduleEventStrict, EventWithID } from 'types';
import { date, debounce, groupBy } from '@/library/utils';
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

    get sorted() {
        return [...this.events].sort((a, b) => a.date - b.date);
    }

    get grouped() {
        return groupBy<ScheduleEventStrict>(this.sorted, (event) => date.when(event.date, false));
    }

    get today() {
        return this.grouped.get(date.when(Date.now(), false))?.length ?? 0;
    }

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

    updateDialogEvent = (props: ScheduleEvent) => {
        this.setDialogEvent({ ...this.dialogEvent, ...props });
    };

    setEvents = (events: ScheduleEventStrict[]) => {
        this.events = events;
    };

    fetchEvents = () => api.get().then(this.setEvents);

    createEvent = (event: ScheduleEvent) => api.create(event).then(debounce(this.setEvents));

    updateEvent = (event: EventWithID<ScheduleEvent>) =>
        api.update(event).then(debounce(this.setEvents));

    removeEvent = (id: string | number) => api.delete(id).then(this.setEvents);
}

const store = new ScheduleStore();

type ScheduleStoreType = typeof store;

export { ScheduleStoreType };

export default store;
