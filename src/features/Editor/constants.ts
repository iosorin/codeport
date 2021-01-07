import { EditorConfiguration } from 'codemirror';

/* default editor value */
// export const DEFAULT_VALUE = `// 1. Implement a binary search algorithm.
// class BinarySearch {
//     constructor(public sorted: number[]) {}

//     indexOf(n: number): number {}
// }`;

export const DEFAULT_VALUE = `// Rextester.Program.Main is the entry point for your code. Don't change it.
// Microsoft (R) Visual C# Compiler version 2.9.0.63208 (958f2354)

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Rextester
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Your code goes here
            Console.WriteLine("Hello, world!");
        }
    }
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

/* default languages list (https://github.com/uiwjs/react-codemirror/blob/master/website/modes.js) */
export const MODES = [
    'typescript',
    'javascript',
    'c#',
    'c++',
    'java',
    'python',
    'php',
    'clojure',
    'ruby',
    'go',
    'swift',
    'lua',
    'html',
];

/* default language font-size */
export const DEFAULT_MODE = MODES[2];

/* default font-size (px) */
export const DEFAULT_FZ = 18;

/* default settings */
export type ExtendedEditorConfig = EditorConfiguration & { fontSize?: number };
export const DEFAULT_SETTINGS: ExtendedEditorConfig = {
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
};
