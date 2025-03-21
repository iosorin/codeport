/* eslint-disable @typescript-eslint/no-explicit-any */

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

export const sortBy = (source: any[], prop: string, up = false) => {
    return source.sort((a, b) => (up ? b[prop] - a[prop] : a[prop] - b[prop]));
};

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
    input: (d: Date | number | undefined, type = 'datetime-local'): string | number => {
        if (!d) return '';

        const date = new Date(d);

        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

        const lastChar = type === 'datetime-local' ? 16 : 10;

        return date.toISOString().substring(0, lastChar);
    },

    match: (d1: Date | number | string, d2: Date | number | string = Date.now()): boolean => {
        d1 = new Date(d1);
        d2 = new Date(d2);

        return (
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear()
        );
    },

    diff: (start: number, maxNearestDays = 1, end = Date.now()): string | 0 => {
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
    },

    addDays: (days: number, date = new Date()) => {
        return date.setDate(date.getDate() + days);
    },

    getDates: (start: Date, end: Date) => {
        const dates = [];
        const currentDate = start;

        while (currentDate <= end) {
            dates.push(currentDate.getTime());

            date.addDays(1, currentDate);
        }

        return dates;
    },

    when: (d: Date | number | undefined, showTime = true, showDay = true) => {
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
    },
};

export const emojiHero = () => {
    // prettier-ignore
    const emojis = [
        '💃','👻','🎅','👩‍🚀','👨‍🚀','🐱‍🏍','🐱‍💻','🐱‍👓','🐱‍🚀','🦸‍♂️','🦸‍♀️','🧚‍♂️','🧚‍♀️'
    ];

    return emojis[Math.floor(Math.random() * emojis.length)];
};
