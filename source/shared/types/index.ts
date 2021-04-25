import { SUPPORTED_LANGUAGES } from '../defaults';
import { ParamRequired } from './utils';

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
    id: string | number;
    date: number;
    title: string;
    stack: string;
    salary: string;
    contacts: string;
    additional: string;
    color: string;
};

export type NewEvent = ParamRequired<ScheduleEvent, 'id'>;

// export type ScheduleEventStrict = {
//     id: string | number;
//     date: number;
//     title: string;
//     stack: string;
//     salary: string;
//     contacts: string;
//     additional: string;
//     color: string;
// };

export type ActivityEvent = ScheduleEvent & {
    rating: number;
    snippets: CodeSnippet[];
    time: number; // min.
};
