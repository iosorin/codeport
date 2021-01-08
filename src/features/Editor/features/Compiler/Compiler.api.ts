// eslint-disable-next-line import/no-extraneous-dependencies
import * as ts from 'typescript';
import { api } from '@/services/api';
import { languages } from './languages';

type CompileResponse = {
    Errors?: string | null;
    Files?: string | null;
    NotLoggedIn?: boolean;
    Result: string | null;
    Stats?: string;
    Warnings?: string | null;
};

export const API = {
    compile: async (Program: string, language: string): Promise<CompileResponse> => {
        const choice = languages[language as keyof typeof languages];

        if (!choice) throw new Error('language invalid');

        Program = Program.replace(
            /(namespace|class) Entry/g,
            (_, keyword) => `${keyword} Rextester`
        ); // ooops

        if (language === 'typescript') {
            const result = ts.transpileModule(Program, {
                compilerOptions: { module: ts.ModuleKind.CommonJS },
            });

            console.log('test', result.outputText);

            return { Result: 'bla' };
        }

        return api
            .post('https://rextester.com/rundotnet/api', {
                Program,
                LanguageChoice: choice.key,
                CompilerArgs: choice.args || '',
            })
            .then((res) => {
                if (res.data.Errors) {
                    res.data.Errors = res.data.Errors.replace(/'Rextester'/, "'Entry'");
                }

                return res.data;
            });
    },
};
