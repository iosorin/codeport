import { Response, Request } from 'express';
import type { SnippetsContract as Contract } from 'contracts/snippets.contract';
import { Snippets } from '../models/Snippets';

export const get = async (_: Request, res: Response) => {
	const snippets = await Snippets.get();

	return res.json(snippets) as Response<Contract['GET']['response']>;
};

export const create = async (
	req: Request<null, null, Contract['CREATE']['request']>,
	res: Response
) => {
	const snippets = await Snippets.create(req.body);

	return res.status(201).json(snippets) as Response<Contract['CREATE']['response']>;
};

export const update = async (
	req: Request<null, null, Contract['UPDATE']['request']>,
	res: Response
) => {
	const snippets = await Snippets.update(req.body);

	return res.json(snippets) as Response<Contract['UPDATE']['response']>;
};

export const remove = async (req: Request<Contract['REMOVE']['params']>, res: Response) => {
	const snippets = await Snippets.remove(req.params.id);

	return res.json(snippets) as Response<Contract['REMOVE']['response']>;
};
