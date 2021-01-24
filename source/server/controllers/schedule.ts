import { ScheduleEventStrict } from 'types';

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

const ScheduleEvent = {
    date: 0,
    title: '',
    stack: '',
    salary: '',
    contacts: '',
    additional: '',
};

export const get = (_, res) => res.json(list);

export const create = (req, res) => {
    list.push({ ...ScheduleEvent, ...req.body, id: Date.now() });

    res.status(201).json(list);
};

export const update = (req, res) => {
    list = list.map((event) => {
        if (event.id === req.body?.id) {
            return { ...event, ...req.body };
        }

        return event;
    });

    res.status(200).json(list);
};

export const remove = (req, res) => {
    list = list.filter((s) => s.id != req.params.id);

    res.json(list);
};
