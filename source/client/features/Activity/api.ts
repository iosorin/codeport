import { http } from '@services';
import { ScheduleEvent, CompletedScheduleEvent } from 'types';

type Res = CompletedScheduleEvent[];

export const api = {
    get: async (): Promise<Res> => {
        return http.get('/api/activity').then((res) => res.data);
    },

    update: async (event: ScheduleEvent): Promise<Res> => {
        return http.put('/api/activity', event).then((res) => res.data);
    },

    delete: async (id: string | number): Promise<Res> => {
        return http.delete(`/api/activity/${id}`).then((res) => res.data);
    },
};
