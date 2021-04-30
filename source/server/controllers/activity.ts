import { Response, Request } from 'express';
import type { ActivityContract } from 'contracts/activity.contract';
import { Activity } from '../models/Activity';

export const get = async (_: Request, res: Response) => {
    const activity = await Activity.get();

    return res.json(activity) as Response<ActivityContract['GET']['response']>;
};

export const update = async (
    req: Request<null, null, ActivityContract['UPDATE']['request']>,
    res: Response
) => {
    const activity = await Activity.update(req.body);

    return res.json(activity) as Response<ActivityContract['UPDATE']['request']>;
};

export const remove = async (req: Request<ActivityContract['REMOVE']['params']>, res: Response) => {
    const activity = await Activity.remove(req.params.id);

    return res.json(activity) as Response<ActivityContract['REMOVE']['response']>;
};
