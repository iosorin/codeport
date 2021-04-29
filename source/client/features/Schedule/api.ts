import { http } from '@services';
import { ScheduleEvent } from 'types';

type Res = ScheduleEvent[];

export const api = {
    get: async (): Promise<Res> => {
        return http.get('/api/schedule').then((res) => res.data);
    },

    create: async (event: Partial<ScheduleEvent>): Promise<Res> => {
        return http.post('/api/schedule', event).then((res) => res.data);
    },

    update: async (event: Partial<ScheduleEvent>): Promise<Res> => {
        // todo - сравнить с тем, что ожидает сервер
        return http.put('/api/schedule', event).then((res) => res.data);
    },

    delete: async (id: ScheduleEvent['id']): Promise<Res> => {
        return http.delete(`/api/schedule/${id}`).then((res) => res.data);
    },
};
