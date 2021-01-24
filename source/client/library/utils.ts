export const randomEmojiHero = () => {
    // prettier-ignore
    const emojis = [
        '💃','👻','🎅','👩‍🚀','👨‍🚀','🐱‍🏍','🐱‍💻','🐱‍👓','🐱‍🚀','🦸‍♂️','🦸‍♀️','🧚‍♂️','🧚‍♀️'
    ];

    return emojis[Math.floor(Math.random() * emojis.length)];
};

export const uuid = () => {
    return Date.now().toString(36);
};

export const date = {
    input(d: Date | number | undefined, type = 'datetime-local'): string {
        if (!d) return '';

        const date = new Date(d);

        const stop = type === 'datetime-local' ? 16 : 10;

        return date.toISOString().substring(0, stop);
    },
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

// export const debounce = (cb = () => {}, tm = 300) => {
//     setTimeout(() => {
//         cb();
//     }, tm);
// };

export const debounce = (fn, wait = 300) => {
    let timeout: any;

    return function (this: any, ...args: any) {
        const later = () => {
            clearTimeout(timeout);

            fn.apply(this, args);
        };

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
    };
};

export function throttle(func, wait = 300) {
    let isThrottled = false;
    let savedArgs;
    let savedThis;

    function wrapper(this: any, ...args) {
        if (isThrottled) {
            savedArgs = args;
            savedThis = this;

            return;
        }

        func.apply(this, args);

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                // eslint-disable-next-line no-multi-assign
                savedArgs = savedThis = null;
            }
        }, wait);
    }

    return wrapper;
}

export const delay = (fn, wait = 300) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fn);
        }, wait);
    });
};

// export const exposeErrorTitle = (error:unknown) => {
//     return JSON.stringify(error.stack, (a,b) => {
//         console.log(a,b)
//         return
//     })
// }
