import { ActivityStore } from '@/features/Activity';
import { ConferenceStore } from '@/features/Conference';

export class RootStore {
    activity: ActivityStore;

    conference: ConferenceStore;

    constructor() {
        this.activity = new ActivityStore();
        this.conference = new ConferenceStore();
    }
}
