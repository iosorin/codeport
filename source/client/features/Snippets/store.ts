import { makeAutoObservable } from 'mobx';
import type { Snippet } from 'types';
import { api, Contract } from './api';

export class SnippetsStore {
	snippets: Snippet[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	get empty() {
		return !this.snippets.length;
	}

	setSnippets = (snippets: Snippet[]) => {
		this.snippets = snippets;
	};

	fetch = () => api.get().then(this.setSnippets);

	create = (data: Contract['create']) =>
		api.create(data).then(this.setSnippets);

	update = (data: Contract['update']) =>
		api.update(data).then(this.setSnippets);

	remove = (id: Contract['id']) => api.remove(id).then(this.setSnippets);
}
