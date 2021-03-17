import { http } from '@services';
import { ScheduleEvent, ScheduleEventStrict } from 'types';

export const api = {
    get: async (): Promise<ScheduleEventStrict[]> => {
        return http.get('/api/schedule').then((res) => res.data);
    },

    create: async (event: ScheduleEvent): Promise<ScheduleEventStrict> => {
        return http.post('/api/schedule', event).then((res) => res.data);
    },

    update: async (event: ScheduleEvent): Promise<ScheduleEventStrict> => {
        return http.put('/api/schedule', event).then((res) => res.data);
    },

    delete: async (id: string | number): Promise<ScheduleEventStrict> => {
        return http.delete(`/api/schedule/${id}`).then((res) => res.data);
    },
};
