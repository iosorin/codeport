import { EditorConfiguration } from 'codemirror';

/* default editor value */
export const DEFAULT_VALUE = `const helloMessage: string = 'Hey, there 👋'`;

/* default color theme */
export const APP_THEME = 'codeport';
export const THEMES = [APP_THEME, 'darcula', 'dracula', 'material', 'ayu-mirage', 'xq-light'];
export const DEFAULT_THEME = APP_THEME;

/* default languages list (https://github.com/uiwjs/react-codemirror/blob/master/website/modes.js) */
export const MODES = [
    'typescript-jsx',
    'javascript',
    'python',
    'java',
    'php',
    'c++',
    'c#',
    'swift',
    'html',
];

/* default language font-size */
export const DEFAULT_MODE = MODES[0];

/* default font-size (px) */
export const DEFAULT_FZ = 17;

/* default settings */
export type ExtendedEditorConfig = EditorConfiguration & { fontSize?: number };
export const DEFAULT_SETTINGS: ExtendedEditorConfig = {
    mode: DEFAULT_MODE,
    theme: DEFAULT_THEME,
    tabSize: 2,
    indentWithTabs: true,
    lineNumbers: true,
    lineWrapping: true,
    fontSize: DEFAULT_FZ,
    keyMap: 'sublime',
    smartIndent: false,
    autoCloseTags: true,
};
