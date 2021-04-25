import React, { createContext, FC, useContext } from 'react';
import { core } from './core';

const CoreContext = createContext(core);

export const CoreProvider: FC = ({ children }) => {
    return <CoreContext.Provider value={core}>{children}</CoreContext.Provider>;
};

export const useCore = () => useContext(CoreContext);

export const useUi = () => useCore().ui;
export const useToast = () => useCore().toast;
