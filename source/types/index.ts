export type User = {
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
};

export type ScheduleEventStrict = {
    id: string | number;
    date: number;
    title: string;
    stack: string;
    salary: string;
    contacts: string;
    additional: string;
};
