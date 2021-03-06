import { EditorConfiguration } from 'codemirror';

/* default editor value */
export const DEFAULT_VALUE = '';

/* themes */
export const CODEPORT_THEME = 'codeport';

export const THEMES = [
    CODEPORT_THEME,
    'darcula',
    'dracula',
    'shadowfox',
    'ayu-mirage',
    'monokai',
    'material',
];

export const DEFAULT_THEME = CODEPORT_THEME;

/* language */
export const DEFAULT_MODE = 'javascript';

/* font-size */
export const DEFAULT_FZ = 18;

/* settings */
export type EditorSettingsType = EditorConfiguration & { fontSize?: number };
export const DEFAULT_SETTINGS: EditorSettingsType = {
    mode: DEFAULT_MODE,
    theme: DEFAULT_THEME,
    tabSize: 4,
    indentUnit: 4,
    indentWithTabs: true,
    lineNumbers: true,
    lineWrapping: true,
    fontSize: DEFAULT_FZ,
    keyMap: 'sublime',
    smartIndent: true,
    autoCloseTags: true,
    autofocus: true,
    autoCloseBrackets: true,
    autocorrect: true,
    autocapitalize: true,
};
