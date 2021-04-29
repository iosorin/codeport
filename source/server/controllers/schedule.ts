import { Response, Request } from 'express';
import { NewEvent } from 'types';
import { Schedule } from '../models/Schedule';

export const get = async (_: Request, res: Response) => {
    const schedule = await Schedule.get();

    return res.json(schedule);
};

export const create = async (req: Request<null, null, NewEvent>, res: Response) => {
    const schedule = await Schedule.create(req.body);

    return res.status(201).json(schedule);
};

export const update = async (req: Request<null, null, NewEvent>, res: Response) => {
    const schedule = await Schedule.update(req.body);

    return res.json(schedule);
};

export const remove = async (req: Request<{ id: string }>, res: Response) => {
    const schedule = await Schedule.remove(req.params.id);

    return res.json(schedule);
};
