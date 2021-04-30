import path from 'path';
import type { ActivityContract } from 'contracts/activity.contract';
import { update } from '../../shared/utils';
import { EVENT_COLOR } from '../../shared/defaults';
import { read, write } from '../utils/fs';

const source = path.join(__dirname, '..', '..', '..', 'data', 'activity.json');

export class Activity {
    static template = {
        title: 'Untitled Conference',
        stack: '',
        salary: '',
        contacts: '',
        additional: '',
        color: EVENT_COLOR,
        time: 0,
        rating: 0,
        snippets: [],
    };

    static get = () => read(source) as Promise<ActivityContract['GET']['response']>;

    static create = async (date: number, time: number, _roomID: string) => {
        const events = await Activity.get();

        const index = events.findIndex((event) => event._roomID === _roomID);

        const event = { ...Activity.template, date, time, id: Date.now(), _roomID };

        index >= 0 ? (events[index] = event) : events.push(event);

        return write(source, events) as Promise<ActivityContract['CREATE']['response']>;
    };

    static update = async (data: ActivityContract['UPDATE']['request']) => {
        let events = await Activity.get();

        events = update(events, data);

        return write(source, events) as Promise<ActivityContract['UPDATE']['response']>;
    };

    static remove = async (id: ActivityContract['REMOVE']['params']['id']) => {
        let events = await Activity.get();

        events = events.filter((event) => event.id.toString() !== id.toString());

        return write(source, events) as Promise<ActivityContract['REMOVE']['response']>;
    };
}
