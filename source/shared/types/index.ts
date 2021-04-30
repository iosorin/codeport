import { SUPPORTED_LANGUAGES } from '../defaults';
import { Required } from './utils';

export * from './socket';
export * from './utils';

export type Language = typeof SUPPORTED_LANGUAGES[number];

export type Snippet = {
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

export type NewEvent = Required<ScheduleEvent, 'id'>;

export type ActivityEvent = ScheduleEvent & {
    rating: number;
    snippets: Snippet[];
    time: number; // min.
    _roomID?: string;
};
