import { http } from '@services';
import { ScheduleEvent } from 'types';

export const api = {
    get: async (): Promise<ScheduleEvent[]> => {
        return http.get('/api/schedule').then((res) => res.data);
    },

    create: async (event: Partial<ScheduleEvent>): Promise<ScheduleEvent[]> => {
        return http.post('/api/schedule', event).then((res) => res.data);
    },

    update: async (event: Partial<ScheduleEvent>): Promise<ScheduleEvent[]> => {
        return http.put('/api/schedule', event).then((res) => res.data);
    },

    delete: async (id: string | number): Promise<ScheduleEvent[]> => {
        return http.delete(`/api/schedule/${id}`).then((res) => res.data);
    },
};
