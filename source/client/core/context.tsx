import React, { createContext, FC, useContext } from 'react';
import { store } from './store';

const Context = createContext(store);

export const Provider: FC = ({ children }) => (
	<Context.Provider value={store}>{children}</Context.Provider>
);

export const useCore = () => useContext(Context);

export function always<K extends keyof typeof store>(key: K) {
	return store[key];
}
