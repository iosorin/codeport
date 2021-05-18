import { http } from '@core';
import type { SnippetsContract } from 'contracts/snippets.contract';

export type Contract = {
    create: SnippetsContract['CREATE']['request'];
    update: SnippetsContract['UPDATE']['request'];
    id: SnippetsContract['REMOVE']['params']['id'];
};

export const api = {
    get: async (): Promise<SnippetsContract['GET']['response']> => {
        return http.get('/api/snippets').then((res) => res.data);
    },

    create: async (data: Contract['create']): Promise<SnippetsContract['CREATE']['response']> => {
        return http.post('/api/snippets', data).then((res) => res.data);
    },

    update: async (data: Contract['update']): Promise<SnippetsContract['UPDATE']['response']> => {
        return http.put('/api/snippets', data).then((res) => res.data);
    },

    remove: async (id: Contract['id']): Promise<SnippetsContract['REMOVE']['response']> => {
        return http.delete(`/api/snippets/${id}`).then((res) => res.data);
    },
};
