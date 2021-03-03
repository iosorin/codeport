import React, { createContext, FC, useContext } from 'react';
import { configure } from 'mobx';
import { UiStore } from '@/stores/ui.store';
import { RootStore } from '@/stores/root.store';
import { SocketService } from '@services';

configure({
    enforceActions: 'observed',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: false,
    disableErrorBoundaries: false,
});

/* Core */
const Core = {
    ui: new UiStore(),
    root: new RootStore(),
    socket: SocketService.getInstance(),
};

const CoreContext = createContext(Core);

export const useCore = () => {
    return useContext(CoreContext);
};

export const useUi = () => {
    return useCore().ui;
};

export const useRoot = () => {
    return useCore().root;
};

export const CoreProvider: FC = ({ children }) => {
    return <CoreContext.Provider value={Core}>{children}</CoreContext.Provider>;
};
