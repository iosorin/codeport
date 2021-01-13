import { monaco } from 'react-monaco-editor';
import themes from 'monaco-themes/themes/themelist.json';
import { CODEPORT_THEME } from './constants';

export const defineTheme = (theme: string) => {
    return new Promise((resolve) => {
        if (theme === CODEPORT_THEME) {
            monaco.editor.setTheme(theme);

            resolve(theme);

            return;
        }

        import(`monaco-themes/themes/${themes[theme as keyof typeof themes]}.json`).then((data) => {
            monaco.editor.defineTheme(theme, data);
            monaco.editor.setTheme(theme);

            resolve(theme);
        });
    });
};
