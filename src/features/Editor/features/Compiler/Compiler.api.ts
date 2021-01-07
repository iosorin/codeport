import { api } from '@/services/api';

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

export type AllowedLanguage = keyof typeof languagesCode;

type CompileResponse = {
    Errors: string | null;
    Files: string | null;
    NotLoggedIn: boolean;
    Result: string | null;
    Stats: string;
    Warnings: string | null;
};

export const API = {
    compile: async (code: string, language: AllowedLanguage): Promise<CompileResponse> => {
        return api
            .post('https://rextester.com/rundotnet/api', {
                Program: code,
                LanguageChoice: languagesCode[language],
            })
            .then((res) => res.data);
    },
};
