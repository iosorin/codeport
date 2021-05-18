import React, { createContext, FC, useContext } from 'react';
import { store } from './store';

const Context = createContext(store);

export const Provider: FC = ({ children }) => (
    <Context.Provider value={store}>{children}</Context.Provider>
);

export const useCore = () => useContext(Context);

export const useUi = () => useCore().ui;
export const useToast = () => useCore().toast;
export const useSnippets = () => useCore().snippets;
