import React, { createContext, FC, useContext } from 'react';
import { Core } from './core';

const CoreContext = createContext(Core);

export const CoreProvider: FC = ({ children }) => {
    return <CoreContext.Provider value={Core}>{children}</CoreContext.Provider>;
};

export const useCore = () => useContext(CoreContext);
export const useUi = () => useCore().ui;
