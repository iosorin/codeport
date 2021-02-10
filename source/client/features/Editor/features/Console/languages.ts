import { Language } from 'types';

type LanguageObj = {
    key: number;
    version: string;
    args?: string;
    code?: string;
};

export const languages = {
    javascript: { key: 0, version: 'beta' },
    // typescript: { key: -1, version: 'TS' },
    python: { key: 24, version: 'Python 3.6.9' },
    php: { key: 8, version: 'PHP 7.2.24' },
    ruby: { key: 12, version: 'Ruby 2.5.1 ' },
    lua: { key: 14, version: 'Lua 5.3' },
    go: { key: 20, version: 'Go 1.10.4' },
    swift: { key: 37, version: 'Swift 5.1.5' },
    kotlin: { key: 43, version: 'Kotlin 1.1' },
    clojure: { key: 47, version: 'Clojure 1.9.0' },
    'c++': {
        key: 27,
        version: 'Microsoft (R) C/C++ Optimizing Compiler Version 19.00.23506 for x64',
        args: '-Wall -std=c++14 -stdlib=libc++ -O2 -o a.out source_file.cpp',
    },
    'c#': {
        key: 1,
        version: 'Microsoft (R) Visual C# Compiler version 2.9.0.63208 (958f2354)',
        code: `// Entry.Program.Main is the entry point for your code. Don't change it.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Entry
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Hello, world!");
        }
    }
}`,
    },
    java: {
        key: 4,
        version: "OpenJDK version '11.0.5'",
        code: `// 'main' method must be in a class 'Entry'.

import java.util.*;
import java.lang.*;

class Entry
{
    public static void main(String args[])
    {
        System.out.println("Hello, World!");
    }
}`,
    },
} as Record<Language, LanguageObj>;
