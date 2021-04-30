import path from 'path';
import type { ScheduleContract } from 'contracts/schedule.contract';
import type { NewEvent, ScheduleEvent } from 'types';
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

    static get = () => read(schedulePath) as Promise<ScheduleContract['GET']['response']>;

    static create = async (data: ScheduleContract['CREATE']['request']) => {
        const schedule: ScheduleEvent[] = await Schedule.get();

        if (data.date) {
            Notification.toQueue('scheduled', data as ScheduleEvent);
        }

        schedule.push({ ...Schedule.template, ...data, id: Date.now() });

        return write(schedulePath, schedule) as Promise<ScheduleContract['CREATE']['response']>;
    };

    static update = async (data: ScheduleContract['UPDATE']['request']) => {
        let schedule: ScheduleEvent[] = await Schedule.get();

        schedule = update(schedule, data);

        return write(schedulePath, schedule) as Promise<ScheduleContract['UPDATE']['response']>;
    };

    static remove = async (id: ScheduleContract['REMOVE']['params']['id']) => {
        let schedule: ScheduleEvent[] = await Schedule.get();

        schedule = schedule.filter((event) => event.id.toString() !== id.toString());

        return write(schedulePath, schedule) as Promise<ScheduleContract['REMOVE']['response']>;
    };
}
