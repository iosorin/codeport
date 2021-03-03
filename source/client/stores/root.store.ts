import { ActivityStore } from '@/features/Activity';

export class RootStore {
    activity: ActivityStore;

    constructor() {
        this.activity = new ActivityStore();
    }
}
