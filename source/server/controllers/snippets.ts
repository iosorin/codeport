import { Response, Request } from 'express';
import { Optional, Snippet } from 'types';
import { Snippets } from '../models/Snippets';

export const get = async (_: Request, res: Response) => {
    const snippets = await Snippets.get();

    return res.json(snippets);
};

export const create = async (req: Request<null, null, Optional<Snippet, 'id'>>, res: Response) => {
    const snippets = await Snippets.create(req.body);

    return res.status(201).json(snippets);
};

export const update = async (req: Request<null, null, Snippet>, res: Response) => {
    const snippets = await Snippets.update(req.body);

    return res.json(snippets);
};

export const remove = async (req: Request<{ id: string }>, res: Response) => {
    const snippets = await Snippets.remove(req.params.id);

    return res.json(snippets);
};
