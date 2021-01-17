import React, { createContext, FC, useContext } from 'react';
import { configure } from 'mobx';
import api from './api';
import { SocketService } from '@services';
import { UiStore } from './stores/UI.store';

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
    socket: SocketService.getInstance(),
    api,
};

const CoreContext = createContext(Core);

export const useCore = () => {
    return useContext(CoreContext);
};

export const useUi = () => {
    return useContext(CoreContext).ui;
};

export const useApi = () => {
    return useContext(CoreContext).api;
};

export const CoreProvider: FC = ({ children }) => {
    return <CoreContext.Provider value={Core}>{children}</CoreContext.Provider>;
};
