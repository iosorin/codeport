import { makeAutoObservable } from 'mobx';
import type { Snippet } from 'types';
import { api } from './api';

export class SnippetsStore {
    snippets: Snippet[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get empty() {
        return !this.snippets.length;
    }

    get total() {
        return 0;
    }

    setSnippets = (snippets: Snippet[]) => {
        this.snippets = snippets;
    };

    fetch = () => api.get().then(this.setSnippets);

    create = (snippet: Snippet) => api.create(snippet).then(this.setSnippets);

    update = (snippet: Snippet) => api.update(snippet).then(this.setSnippets);

    remove = (id: Snippet['id']) => api.remove(id).then(this.setSnippets);
}
