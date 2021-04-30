import React, { createContext, FC, useContext } from 'react';
import { store } from './store';

const Context = createContext(store);

export const Provider: FC = ({ children }) => (
    <Context.Provider value={store}>{children}</Context.Provider>
);

export const useRoot = () => useContext(Context);

export const useUi = () => useRoot().ui;
export const useToast = () => useRoot().toast;
export const useSnippets = () => useRoot().snippets;
