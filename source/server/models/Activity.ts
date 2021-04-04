import path from 'path';
import { ActivityEvent, ScheduleEvent, ScheduleEventStrict } from 'types';
/* todo path */
import { EVENT_COLOR } from '../../shared/defaults';
import { read, write } from '../utils/fs';

const activityPath = path.join(__dirname, '..', '..', '..', 'data', 'activity.json');

type Res = ({ _roomID?: string } & ActivityEvent)[];

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

    static fetch = () => {
        return read(activityPath) as Promise<Res>;
    };

    static async create(date: number, time: number, _roomID: string) {
        const events = await Activity.fetch();

        const index = events.findIndex((event) => event._roomID === _roomID);

        const event = { ...Activity.template, date, time, id: Date.now(), _roomID };

        index >= 0 ? (events[index] = event) : events.push(event);

        return write(activityPath, events) as Promise<ScheduleEventStrict[]>;
    }

    static update = async (scheduleEvent: ScheduleEvent) => {
        let events = await Activity.fetch();

        events = events.map((event) => {
            if (event.id === scheduleEvent.id) {
                return { ...event, ...scheduleEvent };
            }

            return event;
        });

        return write(activityPath, events) as Promise<Res>;
    };

    static async remove(eventID: string) {
        let events = await Activity.fetch();

        events = events.filter((event) => event.id.toString() !== eventID);

        return write(activityPath, events) as Promise<Res>;
    }
}
