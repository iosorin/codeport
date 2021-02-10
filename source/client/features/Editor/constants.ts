import { EditorConfiguration } from 'codemirror';

/* default editor value */
export const DEFAULT_VALUE = `// 1. Implement a binary search algorithm.
class BinarySearch {
    constructor(sorted) {}

    indexOf(number) {}
}

const instance = new BinarySearch([1,2,3,4,5]);

console.log(instance.indexOf(4));`;

export const KOTLIN_DEFAULT_VALUE = `/**
* We declare a package-level function main which returns Unit and takes
* an Array of strings as a parameter. Note that semicolons are optional.
*/

fun main(args: Array<String>) {
   println("Hello, world!")
}`;

/* default color theme */
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
export const DEFAULT_THEME = 'darcula';

/* default language font-size */
export const DEFAULT_MODE = 'javascript';

/* default font-size (px) */
export const DEFAULT_FZ = 18;

/* default settings */
export type EditorSettings = EditorConfiguration & { fontSize?: number };
export const DEFAULT_SETTINGS: EditorSettings = {
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
    extraKeys: {
        Tab: 'save',
    },
};
