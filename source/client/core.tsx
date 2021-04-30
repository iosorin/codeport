import React, { createContext, FC, useContext } from 'react';

import { SocketService } from '@services';
import { ToastStore } from '@/stores/Toast.store';
import { UiStore } from '@/stores/Ui.store';

const Core = {
    ui: new UiStore(),
    toast: new ToastStore(),
    socket: SocketService.getInstance(),
};

const CoreContext = createContext(Core);

const CoreProvider: FC = ({ children }) => {
    return <CoreContext.Provider value={Core}>{children}</CoreContext.Provider>;
};

const useCore = () => useContext(CoreContext);
const useUi = () => useCore().ui;
const useToast = () => useCore().toast;

function dep<K extends keyof typeof Core>(key: K) {
    return Core[key];
}

export { CoreProvider, useCore, useUi, useToast, dep };
