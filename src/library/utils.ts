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
