import React, { createContext, FC, useContext } from 'react';
import { configure } from 'mobx';
import { SocketService } from '@services';
import { UiStore } from './stores/ui.store';

configure({
    enforceActions: 'observed',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: false,
    disableErrorBoundaries: false,
});

/* Core */
const ui = new UiStore();

const Core = {
    ui,
    toast: ui.toast,
    socket: SocketService.getInstance(),
};

const CoreContext = createContext(Core);

export const useCore = () => {
    return useContext(CoreContext);
};

export const useUi = () => {
    return useContext(CoreContext).ui;
};

export const CoreProvider: FC = ({ children }) => {
    return <CoreContext.Provider value={Core}>{children}</CoreContext.Provider>;
};
