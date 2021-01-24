import { delay } from '@/library/utils';
import { makeAutoObservable } from 'mobx';
import { ScheduleEvent, ScheduleEventStrict } from 'types';
import { api } from './schedule.api';

type ScheduleEventOrNull = ScheduleEvent | null | undefined;
// type ScheduleEvent = { [key in keyof ScheduleEvent]?: any } | ScheduleEventOrNull;

class ScheduleStore {
    events: ScheduleEventStrict[] = [];

    dialogIsVisible = false;

    dialogEvent: ScheduleEventOrNull = null;

    constructor() {
        makeAutoObservable(this);
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

    getEvents = () => {
        return api.get().then(this.setEvents);
    };

    createEvent = (event: ScheduleEvent) => {
        return delay(api.create(event).then(this.setEvents));
    };

    updateEvent = (event: ScheduleEvent) => {
        return delay(api.update(event).then(this.setEvents));
    };

    removeEvent = (event: ScheduleEventStrict) => {
        return api.delete(event.id).then(this.setEvents);
    };
}

const store = new ScheduleStore();

export type ScheduleStoreType = typeof store;

export default store;
