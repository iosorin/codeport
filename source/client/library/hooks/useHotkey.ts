import { useEffect } from 'react';

export const useHotkey = (
    key = 'escape',
    handler: (e: KeyboardEvent) => void,
    when = true,
    useKeyup = false
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

        const type = useKeyup ? 'keyup' : 'keydown';

        const listen = () => document.addEventListener(type, handle);
        const clear = () => document.removeEventListener(type, handle);

        (when ? listen : clear)();

        return clear;
    }, [handler, key, when, useKeyup]);
};
