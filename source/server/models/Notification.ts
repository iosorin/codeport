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

    private static scheduledEventEmail(date: string | number) {
        console.log(date);
    }

    private static expiredEventEmail(date: string | number) {
        console.log(date);
    }
}
