import { useEffect } from 'react';

export const useHotkey = (
    key = 'escape',
    handler: (e: KeyboardEvent) => void,
    when = true
): void => {
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if (e.key.toLocaleLowerCase() === key) {
                handler(e);
            }
        };

        const listen = () => document.addEventListener('keyup', handle);
        const clear = () => document.removeEventListener('keyup', handle);

        (when ? listen : clear)();

        return () => {
            clear();
        };
    }, [handler, key, when]);
};
