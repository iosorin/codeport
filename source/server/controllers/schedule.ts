import { Response, Request } from 'express';
import { ScheduleEvent, ScheduleEventStrict } from 'types';
import { ScheduleEventModel } from '../models/Event';

export const get = async (_: Request, res: Response) => {
    ScheduleEventModel.find()
        .then((events) => res.json(events))
        .catch(console.log);
};

export const create = async (req: Request<null, null, ScheduleEvent>, res: Response) => {
    const schedule = new ScheduleEventModel(req.body);

    schedule.save();

    return res.status(201);
};

export const update = async (req: Request<null, null, ScheduleEventStrict>, res: Response) => {
    // EventModel.findByIdAndUpdate
    // const schedule = await Schedule.update(req.body);

    return res.json([]);
};

export const remove = async (req: Request<{ id: string }>, res: Response) => {
    // const schedule = await Schedule.remove(req.params.id);

    return res.json([]);
};
