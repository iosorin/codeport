import { http } from '@core';
import type { SnippetsContract } from 'contracts/snippets.contract';

export type Contract = {
	create: SnippetsContract['CREATE']['request'];
	update: SnippetsContract['UPDATE']['request'];
	id: SnippetsContract['REMOVE']['params']['id'];
};

export const api = {
	get: async (): Promise<SnippetsContract['GET']['response']> => http.get('/api/snippets').then((res) => res.data),

	create: async (
		data: Contract['create']
	): Promise<SnippetsContract['CREATE']['response']> => http.post('/api/snippets', data).then((res) => res.data),

	update: async (
		data: Contract['update']
	): Promise<SnippetsContract['UPDATE']['response']> => http.put('/api/snippets', data).then((res) => res.data),

	remove: async (
		id: Contract['id']
	): Promise<SnippetsContract['REMOVE']['response']> => http.delete(`/api/snippets/${id}`).then((res) => res.data),
};
