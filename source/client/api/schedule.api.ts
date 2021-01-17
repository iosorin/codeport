import { http } from '@services';

type Response = any;

export const ScheduleModuleApi = {
    getAll: async (): Promise<Response> => {
        return http.get('/api/schedule').then((res) => res.data);
    },
};
