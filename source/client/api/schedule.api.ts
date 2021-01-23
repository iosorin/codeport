import { http } from '@services';
import { ScheduleEvent } from 'types';

type GetResponse = ScheduleEvent[];

export const ScheduleModuleApi = {
    getAll: async (): Promise<GetResponse> => {
        return http.get('/api/schedule').then((res) => res.data);
    },
};
