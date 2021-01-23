import { ScheduleEvent } from 'types';

let list: ScheduleEvent[] = [
    {
        id: 0,
        date: 1611411691902,
        title: 'SFXDX, Kaliningrad',
        stack: 'react, typescript, mobx, unit-tests',
        salary: 'from 70 000 after taxes',
        contacts: 'https://t.me/someone',
        additional: 'full time, remote working',
    },
];

export const get = (_, res) => res.json(list);

export const create = (req, res) => {
    const newScheduleEvent = {
        id: Date.now(),
        ...req.body,
    };

    list.push(newScheduleEvent);

    res.status(201).json(newScheduleEvent);
};

export const remove = (req, res) => {
    list = list.filter((s) => s.id != req.params.id);

    res.json({ message: 'schedule event has been removed' });
};
