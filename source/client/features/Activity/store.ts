import { uuid } from '@/library/utils';
import { makeAutoObservable } from 'mobx';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';

type ActivityEventOrNull = CompletedScheduleEvent | null | undefined;
export type EventWithID = ScheduleEvent & { id: string | number };

class ActivityStore {
    events: CompletedScheduleEvent[] = [
        {
            id: uuid(),
            title: 'Ресторан Сервис Инфо',
            date: 1611196124940,
            rating: 0.0,
            snippets: ['1221'],
            stack: 'react, jest, docker, ant-design, full time, remote working',
            salary: 'from 80 000',
            contacts: 'https://github.com/osorina',
            additional: 'full time, remote working full time, remote working full time',
            time: 40,
            color: '#6c67f4',
        },
        {
            id: uuid(),
            title: 'ESET',
            date: 1611696824940,
            rating: 5.5,
            snippets: ['1221', '212'],
            stack: 'vue, typescript, jest, atomic design',
            salary: '12$/hr.',
            contacts: 'contacts',
            additional: 'full time, remote working',
            time: 20,
            color: '#ecfa1c',
        },
    ];

    dialogIsVisible = false;

    confirmDialogIsVisible = false;

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
    };

    updateEvent = (updated: EventWithID) => {
        this.setEvents(
            this.events.map((event) => {
                if (event.id === updated.id) {
                    return { ...event, ...updated };
                }

                return event;
            })
        );
    };
}

const store = new ActivityStore();

export type Store = typeof store;

export default store;
