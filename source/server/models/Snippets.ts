import path from 'path';
import { Snippet, Optional } from 'types';
import { update } from '../../shared/utils';
import { read, write } from '../utils/fs';

const snippetsPath = path.join(__dirname, '..', '..', '..', 'data', 'snippets.json');

export class Snippets {
    static get = () => read(snippetsPath) as Promise<Snippet[]>;

    static create = async (snippet: Optional<Snippet, 'id'>) => {
        const snippets: Snippet[] = await Snippets.get();

        snippets.push({ ...snippet, id: Date.now().toString() });

        return write(snippetsPath, snippets) as Promise<Snippet[]>;
    };

    static update = async (snippet: Snippet) => {
        let snippets: Snippet[] = await Snippets.get();

        snippets = update(snippets, snippet);

        return write(snippetsPath, snippets) as Promise<Snippet[]>;
    };

    static remove = async (id: Snippet['id']) => {
        let snippets: Snippet[] = await Snippets.get();

        snippets = snippets.filter((event) => event.id.toString() !== id.toString());

        return write(snippetsPath, snippets) as Promise<Snippet[]>;
    };
}
