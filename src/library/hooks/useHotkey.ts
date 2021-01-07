import { useEffect } from 'react';

export const useHotkey = (
    key = 'escape',
    handler: (e: KeyboardEvent) => void,
    when = true
): void => {
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            const { altKey } = e;
            const ctrlKey = e.ctrlKey || e.metaKey;

            const prefix = `${ctrlKey ? 'ctrl+' : ''}${altKey ? 'alt+' : ''}`;
            const keyCode = `${prefix}${e.key.toLocaleLowerCase()}`;

            if (keyCode === key) {
                e.preventDefault();

                handler(e);
            }
        };

        const listen = () => document.addEventListener('keydown', handle);
        const clear = () => document.removeEventListener('keydown', handle);

        (when ? listen : clear)();

        return clear;
    }, [handler, key, when]);
};
