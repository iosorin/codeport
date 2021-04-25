import path from 'path';
import { NewEvent, ScheduleEvent } from 'types';
import { mergeItem } from '../../shared/utils';
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
        return read(schedulePath) as Promise<ScheduleEvent[]>;
    }

    static async create(scheduleEvent: NewEvent) {
        const schedule: ScheduleEvent[] = await Schedule.fetch();

        if (scheduleEvent.date) {
            Notification.toQueue('scheduled', scheduleEvent as ScheduleEvent);
        }

        schedule.push({ ...Schedule.template, ...scheduleEvent, id: Date.now() });

        return write(schedulePath, schedule) as Promise<ScheduleEvent[]>;
    }

    static async update(scheduleEvent: NewEvent) {
        let schedule: ScheduleEvent[] = await Schedule.fetch();

        schedule = mergeItem(schedule, scheduleEvent);

        return write(schedulePath, schedule) as Promise<ScheduleEvent[]>;
    }

    static async remove(eventID: string) {
        let schedule: ScheduleEvent[] = await Schedule.fetch();

        schedule = schedule.filter((event) => event.id.toString() !== eventID);

        return write(schedulePath, schedule) as Promise<ScheduleEvent[]>;
    }
}
