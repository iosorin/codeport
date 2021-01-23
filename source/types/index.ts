export type User = {
    id: string;
    constraints: {
        audio: boolean;
        video: boolean;
    };
};

export type ScheduleEvent = {
    id: number;
    date: number;
    title: string;
    stack: string;
    salary: string;
    contacts: string;
    additional: string;
};
