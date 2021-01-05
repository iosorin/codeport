import React, { createContext, FC, useContext } from 'react';
import { configure, makeAutoObservable } from 'mobx';
import { SocketService } from './library/services/SocketService';

configure({
    enforceActions: 'observed',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: false,
    disableErrorBoundaries: false,
});

/* UIStore */
class UIStore {
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

/* Core */
class Core {
    ui = new UIStore();

    socket = SocketService.getInstance();

    constructor() {
        makeAutoObservable(this);
    }
}

const CoreContext = createContext(new Core());

export const useCore = () => {
    return useContext(CoreContext);
};

export const CoreProvider: FC = ({ children }) => {
    return <CoreContext.Provider value={new Core()}>{children}</CoreContext.Provider>;
};
