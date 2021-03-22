import path from 'path';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { read, write } from '../utils/fs';

const activityPath = path.join(__dirname, '..', '..', '..', 'data', 'activity.json');

type Res = CompletedScheduleEvent[];

export class Activity {
    static template = {
        title: '',
        stack: '',
        salary: '',
        contacts: '',
        additional: '',
        color: '',
        time: 0,
        rating: 0,
        snippets: [],
    };

    static fetch = () => {
        return read(activityPath) as Promise<Res>;
    };

    static create = async (time = 0) => {
        const events = await Activity.fetch();

        const newEvent = { ...Activity.template, id: Date.now(), date: Date.now(), time };

        events.push(newEvent);

        write(activityPath, events) as Promise<Res>;

        return newEvent;
    };

    static setTime = async (id: string | number, time: number) => {
        return Activity.update({ id, time });
    };

    static updateTime = async (id: string | number, time: number) => {
        let events = await Activity.fetch();

        events = events.map((ev) => {
            if (ev.id === id) {
                ev.time = time - ev.time;
            }

            return ev;
        });

        return write(activityPath, events) as Promise<Res>;
    };

    static update = async (event: ScheduleEvent) => {
        let events = await Activity.fetch();

        events = events.map((ev) => {
            if (ev.id === event.id) {
                return { ...ev, ...event };
            }

            return ev;
        });

        return write(activityPath, events) as Promise<Res>;
    };

    static async remove(id: string) {
        let events = await Activity.fetch();

        events = events.filter((event) => event.id.toString() !== id);

        return write(activityPath, events) as Promise<Res>;
    }
}
