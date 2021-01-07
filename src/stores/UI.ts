import { makeAutoObservable } from 'mobx';

export class UIStore {
    conferencePanelIsVisible = false;

    constructor() {
        makeAutoObservable(this);
    }

    get sidebarIsVisible() {
        return !this.conferencePanelIsVisible;
    }

    toggleConferencePanel = (show = !this.conferencePanelIsVisible) => {
        this.conferencePanelIsVisible = show;
    };
}
