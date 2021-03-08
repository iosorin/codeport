import { ScheduleEvent } from 'types';

export class Notification {
    public static toQueue(type: 'scheduled' | 'expired', event: ScheduleEvent) {
        console.log(event.date);

        if (type === 'scheduled') {
            console.log('for a schedules event');

            return;
        }

        console.log('for a expired event');
    }

    private static sendEmailForScheduledEvent(date: string | number) {
        console.log(date);
    }

    private static sendEmailForExpiredEvent(date: string | number) {
        console.log(date);
    }
}
