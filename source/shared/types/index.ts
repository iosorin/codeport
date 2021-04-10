import { SUPPORTED_LANGUAGES } from '../defaults';

export * from './socket';
export * from './utils';

export type Language = typeof SUPPORTED_LANGUAGES[number];

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

export type ActivityEvent = ScheduleEventStrict & {
    rating: number;
    snippets: CodeSnippet[];
    time: number; // min.
};
