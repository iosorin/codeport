import React, { createContext, FC, useContext } from 'react';
import { configure } from 'mobx';
import { SocketService } from '@services';
import { UiStore } from './stores/Ui.store';
import { ToastStore } from './stores/Toast.store';

// global mobx configuration
configure({
    enforceActions: 'observed',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: false,
    disableErrorBoundaries: false,
});

// core
const Core = {
    ui: new UiStore(),
    toast: new ToastStore(),
    socket: SocketService.getInstance(),
};

const CoreContext = createContext(Core);

export const useCore = () => useContext(CoreContext);
export const useUi = () => useCore().ui;
export const useToast = () => useCore().toast;

export const CoreProvider: FC = ({ children }) => {
    return <CoreContext.Provider value={Core}>{children}</CoreContext.Provider>;
};
