export const HOTKEYS = {
    EDITOR_TOGGLE_SETTINGS: {
        key: 'Ctrl-P',
        label: 'Settings [Ctrl+P]',
    },

    EDITOR_TOGGLE_CONSOLE: {
        key: 'Ctrl-.',
        label: 'Console [Ctrl+.]',
    },

    EDITOR_SAVE_SNIPPET: {
        key: 'Ctrl-S',
        label: 'Save snippet',
    },
};

export const EDITOR_THEMES = [
    'codeport',
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
    theme?: typeof EDITOR_THEMES[number] | 'default';
};

export const EDITOR_OPTIONS: EditorOptions = {
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
