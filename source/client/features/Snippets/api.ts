import { http } from '@core';
import type { SnippetsContract } from 'contracts/snippets.contract';

export const api = {
    get: async (): Promise<SnippetsContract['GET']['response']> => {
        return http.get('/api/snippets').then((res) => res.data);
    },

    create: async (
        data: SnippetsContract['CREATE']['request']
    ): Promise<SnippetsContract['CREATE']['response']> => {
        return http.post('/api/snippets', data).then((res) => res.data);
    },

    update: async (
        data: SnippetsContract['UPDATE']['request']
    ): Promise<SnippetsContract['UPDATE']['response']> => {
        return http.put('/api/snippets', data).then((res) => res.data);
    },

    remove: async (
        id: SnippetsContract['REMOVE']['params']['id']
    ): Promise<SnippetsContract['REMOVE']['response']> => {
        return http.delete(`/api/snippets/${id}`).then((res) => res.data);
    },
};
