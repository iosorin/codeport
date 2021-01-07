import axios from 'axios';

const languagesCode = {
    'c#': 1,
    'c++': 27,
    java: 4,
    python: 24,
    php: 8,
    ruby: 12,
    lua: 14,
    javascript: 17,
    go: 20,
    swift: 37,
    clojure: 47,
};

const headers = {
    'Content-Type': 'text/plain',
};

export const API = {
    compile: async (code: string, mode: keyof typeof languagesCode) => {
        const Program = code;
        const LanguageChoice = languagesCode[mode];
        console.log('LanguageChoice', LanguageChoice, Program);

        const res = await axios.post(
            'https://rextester.com/rundotnet/api',
            {
                LanguageChoice,
                Program,
            },
            { headers }
        );

        console.log('data', res.data);
    },
};
