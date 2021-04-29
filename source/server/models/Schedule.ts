import path from 'path';
import { NewEvent, ScheduleEvent } from 'types';
import { update } from '../../shared/utils';
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

    static get = () => read(schedulePath) as Promise<ScheduleEvent[]>;

    static create = async (event: NewEvent) => {
        const schedule: ScheduleEvent[] = await Schedule.get();

        if (event.date) {
            Notification.toQueue('scheduled', event as ScheduleEvent);
        }

        schedule.push({ ...Schedule.template, ...event, id: Date.now() });

        return write(schedulePath, schedule) as Promise<ScheduleEvent[]>;
    };

    static update = async (event: NewEvent) => {
        let schedule: ScheduleEvent[] = await Schedule.get();

        schedule = update(schedule, event);

        return write(schedulePath, schedule) as Promise<ScheduleEvent[]>;
    };

    static remove = async (id: ScheduleEvent['id']) => {
        let schedule: ScheduleEvent[] = await Schedule.get();

        schedule = schedule.filter((event) => event.id.toString() !== id.toString());

        return write(schedulePath, schedule) as Promise<ScheduleEvent[]>;
    };
}
