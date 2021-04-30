import { http } from '@core';
import type { Language } from 'types';
import { languages } from './languages';

type CompileResponse = {
    Errors?: string | null;
    Files?: string | null;
    NotLoggedIn?: boolean;
    Result: string | null;
    Stats?: string;
    Warnings?: string | null;
};

// https://www.hackerearth.com/ru/docs/wiki/developers/v3/
export const api = {
    compile: async (Program: string, language: Language): Promise<CompileResponse> => {
        const choice = languages[language];

        if (!choice) throw new Error('language invalid');

        Program = Program.replace(
            /(namespace|class) Entry/g,
            (_, keyword) => `${keyword} Rextester`
        ); // ooops

        return http
            .post('https://rextester.com/rundotnet/api', {
                Program,
                LanguageChoice: choice.key,
                CompilerArgs: choice.args || '',
            })
            .then((res) => {
                if (res.data.Errors) {
                    res.data.Errors = res.data.Errors.replace(/Rextester/g, 'Entry');
                }

                return res.data;
            });
    },
};
