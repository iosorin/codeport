import { http } from '@services';
import { Optional, Snippet } from 'types';

type Res = Snippet[];

export const api = {
    get: async (): Promise<Res> => {
        return http.get('/api/snippets').then((res) => res.data);
    },

    create: async (snippet: Optional<Snippet, 'id'>): Promise<Res> => {
        return http.post('/api/snippets', snippet).then((res) => res.data);
    },

    update: async (snippet: Snippet): Promise<Res> => {
        return http.put('/api/snippets', snippet).then((res) => res.data);
    },

    delete: async (id: Snippet['id']): Promise<Res> => {
        return http.delete(`/api/snippets/${id}`).then((res) => res.data);
    },
};
