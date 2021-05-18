import { http } from '@core';
import type { ActivityContract } from 'contracts/activity.contract';

export type Contract = {
    update: ActivityContract['UPDATE']['request'];
    id: ActivityContract['REMOVE']['params']['id'];
};

export const api = {
    get: async (): Promise<ActivityContract['GET']['response']> => {
        return http.get('/api/activity').then((res) => res.data);
    },

    update: async (data: Contract['update']): Promise<ActivityContract['UPDATE']['response']> => {
        return http.put('/api/activity', data).then((res) => res.data);
    },

    remove: async (id: Contract['id']): Promise<ActivityContract['REMOVE']['response']> => {
        return http.delete(`/api/activity/${id}`).then((res) => res.data);
    },
};
