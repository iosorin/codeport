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

export const debounce = (fn = (e: any) => {}, wait = 300) => {
    let timeout: any;

    return function (...args: any) {
        const later = () => {
            clearTimeout(timeout);

            // eslint-disable-next-line
            // @ts-ignore
            fn.apply(this, args);
        };

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
    };
};
// export const exposeErrorTitle = (error:unknown) => {
//     return JSON.stringify(error.stack, (a,b) => {
//         console.log(a,b)
//         return
//     })
// }
