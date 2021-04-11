import { makeAutoObservable } from 'mobx';
import { ToastStore } from './Toast.store';

export class UiStore {
    toast: ToastStore;

    conferencePanelVisible = false;

    constructor() {
        makeAutoObservable(this);

        this.toast = new ToastStore();
    }

    get sidebarVisible() {
        return !this.conferencePanelVisible;
    }

    toggleConferencePanel = (show = !this.conferencePanelVisible) => {
        this.conferencePanelVisible = show;
    };
}
