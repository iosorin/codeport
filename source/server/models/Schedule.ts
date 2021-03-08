import path from 'path';
import { ScheduleEvent, ScheduleEventStrict } from 'types';
import { read, write } from '../utils/fs';
import { Notification } from './Notification';

const schedulePath = path.join(__dirname, '..', '..', '..', 'data', 'schedule.json');

export class Schedule {
    static template = {
        date: 0,
        title: '',
        stack: '',
        salary: '',
        contacts: '',
        additional: '',
        color: '',
    };

    static async fetch() {
        return read(schedulePath) as Promise<ScheduleEventStrict[]>;
    }

    static async create(scheduleEvent: ScheduleEvent) {
        const schedule: ScheduleEventStrict[] = await Schedule.fetch();

        if (scheduleEvent.date) Notification.toQueue('scheduled', scheduleEvent);

        schedule.push({ ...Schedule.template, ...scheduleEvent, id: Date.now() });

        return write(schedulePath, schedule) as Promise<ScheduleEventStrict[]>;
    }

    static async update(event: ScheduleEvent) {
        let schedule: ScheduleEventStrict[] = await Schedule.fetch();

        schedule = schedule.map((ev) => {
            if (ev.id === event.id) {
                return { ...ev, ...event };
            }

            return ev;
        });

        return write(schedulePath, schedule) as Promise<ScheduleEventStrict[]>;
    }

    static async remove(id: string) {
        let schedule: ScheduleEventStrict[] = await Schedule.fetch();

        schedule = schedule.filter((event) => event.id.toString() !== id);

        return write(schedulePath, schedule) as Promise<ScheduleEventStrict[]>;
    }
}
