import { Response, Request } from 'express';
import { ScheduleEvent } from 'types';
import { Activity } from '../models/Activity';

export const get = async (_: Request, res: Response) => {
    const activity = await Activity.fetch();

    return res.json(activity);
};

export const update = async (req: Request<null, null, ScheduleEvent>, res: Response) => {
    const activity = await Activity.update(req.body);

    return res.json(activity);
};

export const remove = async (req: Request<{ id: string }>, res: Response) => {
    const activity = await Activity.remove(req.params.id);

    return res.json(activity);
};
