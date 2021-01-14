/* default editor value */
export const DEFAULT_VALUE2 = `console.log(Math.random())`;
export const DEFAULT_VALUE3 = `// Welcome to codeport.com 👨‍🚀`;
export const DEFAULT_VALUE = `// 1. Implement a binary search algorithm.
class BinarySearch {
    constructor(sorted) {}

    indexOf(number) {}
};

const instance = new BinarySearch([1, 2, 3, 4, 5, 6]);

console.log(instance.indexOf(5));`;

export const DEFAULT_VALUE1 = `/**
* We declare a package-level function main which returns Unit and takes
* an Array of strings as a parameter. Note that semicolons are optional.
*/

fun main(args: Array<String>) {
   println("Hello, world!")
}`;

/* default color theme */
export const CODEPORT_THEME = 'vs-dark';
export const THEMES = [
    'monokai',
    'idlefingers',
    'pastels-on-dark',
    'tomorrow-night-eighties',
    'vs-dark',
];
export const DEFAULT_THEME = 'idlefingers';

/* default languages list (https://github.com/uiwjs/react-codemirror/blob/master/website/modes.js) */
export const MODES = [
    'javascript',
    'java',
    'php',
    'c#',
    'c++',
    'python',
    'clojure',
    'kotlin',
    'swift',
    'go',
    'ruby',
    'lua',
    'typescript',
    'jsx',
    'html',
];

/* default language font-size */
export const DEFAULT_LANG = 'javascript';

/* default font-size (px) */
export const DEFAULT_FZ = 18;

/* default settings */
export type EditorSettings = any & {
    fontSize?: number;
};
export const DEFAULT_SETTINGS: EditorSettings = {
    language: DEFAULT_LANG,
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
