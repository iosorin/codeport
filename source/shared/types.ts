import { SUPPORTED_LANGUAGES } from './defaults';

export { WrappedSocketService } from './socket';
export enum SocketEmitEvents {
    'connection',
    'check-room',
    'join-room',
    'disconnect',
    'disconnect-user',
    'editor-value',
    'editor-settings',
    'sending-signal',
    'returning-signal',
    'constraints',
}

export enum SocketListenEvents {
    'client:room-full',
    'client:room-empty',
    'client:users-present-in-room',
    'client:user-joined',
    'client:user-left',
    'client:editor-value',
    'client:editor-settings',
    'client:receiving-returned-signal',
    'client:constraints',
}

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

export type Merge<A, B> = {
    [K in keyof A]: K extends keyof B ? B[K] : A[K];
} &
    B;

export type ParamRequired<T, P extends string> = T & { [key in P]: string | number };
