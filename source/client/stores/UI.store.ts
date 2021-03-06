import { makeAutoObservable } from 'mobx';

export class UiStore {
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
