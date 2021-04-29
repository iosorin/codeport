import { http } from '@services';
import type { SnippetsContract as Contract } from 'contracts/snippets.contract';

export const api = {
    get: async (): Promise<Contract['GET']['response']> => {
        return http.get('/api/snippets').then((res) => res.data);
    },

    create: async (
        data: Contract['CREATE']['request']
    ): Promise<Contract['CREATE']['response']> => {
        return http.post('/api/snippets', data).then((res) => res.data);
    },

    update: async (
        data: Contract['UPDATE']['request']
    ): Promise<Contract['UPDATE']['response']> => {
        return http.put('/api/snippets', data).then((res) => res.data);
    },

    delete: async (
        id: Contract['REMOVE']['params']['id']
    ): Promise<Contract['REMOVE']['response']> => {
        return http.delete(`/api/snippets/${id}`).then((res) => res.data);
    },
};
