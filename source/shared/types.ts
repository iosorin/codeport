import { SupportedLanguages } from './defaults';

export type Language = typeof SupportedLanguages[number];

export type CodeSnippet = {
    id: string;
    lang: Language;
    content: string;
};

export type ConferenceUser = {
    id: string;
    constraints: {
        audio: boolean;
        video: boolean;
    };
};

export type ScheduleEvent = {
    id?: string | number;
    date?: number;
    title?: string;
    stack?: string;
    salary?: string;
    contacts?: string;
    additional?: string;
    color?: string;

    rating?: number;
    snippets?: CodeSnippet[];
    time?: number;
};

export type ScheduleEventStrict = {
    id: string | number;
    date: number;
    title: string;
    stack: string;
    salary: string;
    contacts: string;
    additional: string;
    color: string;
};

export type CompletedScheduleEvent = ScheduleEventStrict & {
    rating: number;
    snippets: CodeSnippet[];
    time: number; // min.
};

export type EventWithID<T> = T & { id: string | number };
