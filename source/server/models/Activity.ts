import path from 'path';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { read, write } from '../utils/fs';

const activityPath = path.join(__dirname, '..', '..', '..', 'data', 'activity.json');

type Res = CompletedScheduleEvent[];

export class Activity {
    static fetch = () => {
        return read(activityPath) as Promise<Res>;
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
