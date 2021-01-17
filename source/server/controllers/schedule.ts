let list = [
    { id: 1, name: 'AWS', status: 'working' },
    { id: 2, name: 'Google Cloud', status: 'working' },
    { id: 3, name: 'Yandex Cloud', status: 'working' },
    { id: 4, name: 'Microsoft', status: 'pending' },
];

export const getAll = (req, res) => {
    res.json(list);
};

export const create = (req, res) => {
    const newScheduleEvent = {
        id: Date.now().toString(),
        ...req.body,
    };

    list.push(newScheduleEvent);

    res.status(201).json(newScheduleEvent);
};

export const remove = (req, res) => {
    list = list.filter((s) => s.id != req.params.id);

    res.json({ message: 'schedule event has been removed' });
};
