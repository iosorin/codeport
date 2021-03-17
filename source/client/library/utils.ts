/* eslint-disable @typescript-eslint/no-explicit-any */
import { EVENTS_COLORS } from './constants';

export const emojiHero = () => {
    // prettier-ignore
    const emojis = [
        '💃','👻','🎅','👩‍🚀','👨‍🚀','🐱‍🏍','🐱‍💻','🐱‍👓','🐱‍🚀','🦸‍♂️','🦸‍♀️','🧚‍♂️','🧚‍♀️'
    ];

    return emojis[Math.floor(Math.random() * emojis.length)];
};

export const randomEventColor = () => {
    return EVENTS_COLORS[Math.floor(Math.random() * EVENTS_COLORS.length)];
};

export const memoize = <R, T extends (...args: any[]) => R>(f: T): T => {
    const memory = new Map<string, R>();

    const g = (...args: any[]) => {
        if (!memory.has(args.join())) {
            memory.set(args.join(), f(...args));
        }

        return memory.get(args.join());
    };

    return g as T;
};

export const copy = (text: string) => {
    navigator.clipboard.writeText(text);
};

export const uuid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(10);
};

export const ls = (key: string, payload?: any, merge?: boolean) => {
    // @ts-ignore
    const data = JSON.parse(window.localStorage.getItem(key));

    if (payload) {
        const value = merge ? { ...data, ...payload } : payload;

        window.localStorage.setItem(key, JSON.stringify(value));

        return;
    }

    return data;
};

export const debounce = <F extends (...args: any[]) => any>(func: F, wait = 300) => {
    let timeout = 0;

    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
        new Promise((resolve) => {
            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = window.setTimeout(() => resolve(func(...args)), wait);
        });
};

// todo - memoize
export const sortBy = (source: any[], prop: string, up = false) => {
    return source.sort((a, b) => (up ? b[prop] - a[prop] : a[prop] - b[prop]));
};

// todo - memoize
export const reduceBy = <T>(source: T[], get: string | ((item: T) => string)) => {
    return source.reduce((total: { [key: string]: T[] }, item) => {
        const prop = typeof get === 'string' ? get : get(item);

        if (total[prop]) {
            total[prop].push(item);
        } else {
            total[prop] = [item];
        }

        return total;
    }, {});
};

// todo - memoize
export const groupBy = <T>(source: T[], get: string | ((item: T) => string)) => {
    const map: Map<string, T[]> = new Map();

    source.forEach((item) => {
        const key = typeof get === 'string' ? get : get(item);
        const collection = map.get(key);

        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });

    return map;
};

export const date = {
    input: memoize((d: Date | number | undefined, type = 'datetime-local'): string | number => {
        if (!d) return '';

        const date = new Date(d);

        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

        const lastChar = type === 'datetime-local' ? 16 : 10;

        return date.toISOString().substring(0, lastChar);
    }),

    fixed: memoize(
        (date: Date | number = Date.now(), hours = 0) =>
            new Date(new Date(date).setHours(hours, 0, 0, 0))
    ),

    nTime: memoize((date: Date | number | string = Date.now(), join?: boolean) => {
        date = new Date(date);

        const arr = [date.getDate(), date.getMonth(), date.getFullYear()];

        return join ? arr.join('-') : arr;
    }),

    match: memoize(
        (date1: Date | number | string, date2: Date | number | string = Date.now()): boolean =>
            date.nTime(date1, true) === date.nTime(date2, true)
    ),

    diff: memoize((start: number, maxNearestDays = 1, end = Date.now()): string | 0 => {
        const diff = start - end;
        const date = new Date(diff);

        const months = { value: date.getUTCMonth(), prefix: 'm' };
        const days = { value: date.getUTCDate() - 1, prefix: 'd' };
        const hours = { value: date.getUTCHours(), prefix: 'hr' };
        const minutes = { value: date.getUTCMinutes(), prefix: 'min' };

        if (diff < 0 || days.value > maxNearestDays) return 0;

        return [months, days, hours, minutes]
            .map((d) => (d.value ? `${d.value} ${d.prefix}` : null))
            .filter((d) => d)
            .join(', ');
    }),

    addDays: memoize((days: number, date = Date.now()) => date.setDate(date.getDate() + days)),

    getDates: memoize((start: Date, end: Date) => {
        const dates = [];
        const currentDate = start;

        while (currentDate <= end) {
            dates.push(currentDate.getTime());

            date.addDays(1, currentDate);
        }

        return dates;
    }),

    when: memoize((d: Date | number | undefined, showTime = true, showDay = true) => {
        if (!d) return '';

        const options: Intl.DateTimeFormatOptions = {
            hour12: true,
        };

        if (showDay) {
            options.month = 'long';
            options.day = 'numeric';
        }

        if (showTime || !showDay) {
            options.hour = 'numeric';
            options.minute = 'numeric';
        }

        return new Intl.DateTimeFormat(undefined, options).format(new Date(d));
    }),
};
