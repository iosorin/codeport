export const HOTKEYS = {
    TOGGLE_EDITOR_SETTINGS: {
        key: 'ctrl+p',
        label: 'Settings [ctrl+p]',
    },

    TOGGLE_EDITOR_CONSOLE: {
        key: 'ctrl+.',
        label: 'Console [ctrl+.]',
    },
};

export const EDITOR_THEMES = [
    'codeport',
    'default',
    'darcula',
    'dracula',
    'shadowfox',
    'ayu',
    'monokai',
    'material',
] as const;

export type EditorOptions = CodeMirror.EditorConfiguration & {
    fontSize?: number;
    autoCloseTags?: boolean;
    autoCloseBrackets?: boolean;
    theme?: typeof EDITOR_THEMES[number];
};

export const DEFAULT_EDITOR_OPTIONS: EditorOptions = {
    mode: 'javascript',
    theme: 'default',
    tabSize: 4,
    fontSize: 14,
    indentUnit: 4,
    indentWithTabs: true,
    lineNumbers: true,
    lineWrapping: true,
    keyMap: 'sublime',
    smartIndent: true,
    autoCloseTags: true,
    autofocus: true,
    autoCloseBrackets: true,
    autocorrect: true,
    autocapitalize: true,
};

export const EVENTS_COLORS = ['#ef476f', '#ee7d62', '#ffd166', '#69fa8f', '#7190ff', '#a986ff'];
