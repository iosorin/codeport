import { Response, Request } from 'express';
import { ScheduleEvent, ScheduleEventStrict } from 'types';

let list: ScheduleEventStrict[] = [
    {
        id: 1,
        date: 1611411691902,
        title: 'SFXDX, Kaliningrad',
        stack: 'react, typescript, mobx, unit-tests',
        salary: 'from 70 000 after taxes',
        contacts: 'https://t.me/someone',
        additional: 'full time, remote working',
    },
];

const template = {
    date: 0,
    title: '',
    stack: '',
    salary: '',
    contacts: '',
    additional: '',
};

export const get = (_: Request, res: Response) => res.json(list);

export const create = (req: Request<null, null, ScheduleEvent>, res: Response) => {
    list.push({ ...template, ...req.body, id: Date.now() });

    return res.status(201).json(list);
};

export const update = (req: Request<null, null, ScheduleEventStrict>, res: Response) => {
    list = list.map((event) => {
        if (event.id === req.body?.id) {
            return { ...event, ...req.body };
        }

        return event;
    });

    return res.status(200).json(list);
};

export const remove = (req: Request<{ id: string }>, res: Response) => {
    list = list.filter((s) => s.id.toString() !== req.params.id);

    return res.json(list);
};
