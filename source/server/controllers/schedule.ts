import { Response, Request } from 'express';
import type { ScheduleContract } from 'contracts/schedule.contract';
import { Schedule } from '../models/Schedule';

export const get = async (_: Request, res: Response) => {
	const schedule = await Schedule.get();

	return res.json(schedule) as Response<ScheduleContract['GET']['response']>;
};

export const create = async (
	req: Request<null, null, ScheduleContract['CREATE']['request']>,
	res: Response
) => {
	const schedule = await Schedule.create(req.body);

	return res.status(201).json(schedule) as Response<
		ScheduleContract['CREATE']['response']
	>;
};

export const update = async (
	req: Request<null, null, ScheduleContract['UPDATE']['request']>,
	res: Response
) => {
	const schedule = await Schedule.update(req.body);

	return res.json(schedule) as Response<ScheduleContract['UPDATE']['response']>;
};

export const remove = async (
	req: Request<ScheduleContract['REMOVE']['params']>,
	res: Response
) => {
	const schedule = await Schedule.remove(req.params.id);

	return res.json(schedule) as Response<ScheduleContract['REMOVE']['response']>;
};
