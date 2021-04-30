import path from 'path';
import type { Snippet } from 'types';
import type { SnippetsContract as Contract } from 'contracts/snippets.contract';
import { update } from '../../shared/utils';
import { read, write } from '../utils/fs';

const source = path.join(__dirname, '..', '..', '..', 'data', 'snippets.json');

export class Snippets {
    static get = () => read(source) as Promise<Contract['GET']['response']>;

    static create = async (data: Contract['CREATE']['request']) => {
        const snippets: Snippet[] = await Snippets.get();

        snippets.push({ ...data, id: Date.now().toString() });

        return write(source, snippets) as Promise<Contract['CREATE']['response']>;
    };

    static update = async (data: Contract['UPDATE']['request']) => {
        let snippets: Snippet[] = await Snippets.get();

        snippets = update(snippets, data);

        return write(source, snippets) as Promise<Contract['UPDATE']['response']>;
    };

    static remove = async (id: Contract['REMOVE']['params']['id']) => {
        let snippets: Snippet[] = await Snippets.get();

        snippets = snippets.filter((event) => event.id.toString() !== id.toString());

        return write(source, snippets) as Promise<Contract['REMOVE']['response']>;
    };
}
