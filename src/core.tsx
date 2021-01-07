import React, { createContext, FC, useContext } from 'react';
import { configure } from 'mobx';
import { SocketService } from '@/services';
import { UIStore } from '@/stores/UI';

configure({
    enforceActions: 'observed',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: false,
    disableErrorBoundaries: false,
});

/* Core */
const Core = {
    ui: new UIStore(),
    socket: SocketService.getInstance(),
};

const CoreContext = createContext(Core);

export const useCore = () => {
    return useContext(CoreContext);
};

export const CoreProvider: FC = ({ children }) => {
    return <CoreContext.Provider value={Core}>{children}</CoreContext.Provider>;
};
