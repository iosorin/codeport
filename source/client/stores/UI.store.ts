import { makeAutoObservable } from 'mobx';
import { ToastManager } from './ToastManager';

export class UiStore {
    toast = new ToastManager();

    conferencePanelVisible = false;

    constructor() {
        makeAutoObservable(this);
    }

    get sidebarVisible() {
        return !this.conferencePanelVisible;
    }

    toggleConferencePanel = (show = !this.conferencePanelVisible) => {
        this.conferencePanelVisible = show;
    };
}
