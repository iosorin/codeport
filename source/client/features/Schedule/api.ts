import { http } from '@core';
import type { ScheduleContract } from 'contracts/schedule.contract';

export type Contract = {
	create: ScheduleContract['CREATE']['request'];
	update: ScheduleContract['UPDATE']['request'];
	id: ScheduleContract['REMOVE']['params']['id'];
};

export const api = {
	get: async (): Promise<ScheduleContract['GET']['response']> => {
		return http.get('/api/schedule').then((res) => res.data);
	},

	create: async (
		data: Contract['create']
	): Promise<ScheduleContract['CREATE']['response']> => {
		return http.post('/api/schedule', data).then((res) => res.data);
	},

	update: async (
		data: Contract['update']
	): Promise<ScheduleContract['UPDATE']['response']> => {
		// todo - сравнить с тем, что ожидает сервер
		return http.put('/api/schedule', data).then((res) => res.data);
	},

	remove: async (
		id: Contract['id']
	): Promise<ScheduleContract['REMOVE']['response']> => {
		return http.delete(`/api/schedule/${id}`).then((res) => res.data);
	},
};
