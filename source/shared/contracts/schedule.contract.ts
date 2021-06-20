import type { ScheduleEvent } from 'types';

export type ScheduleContract = {
	GET: {
		response: ScheduleEvent[];
	};

	CREATE: {
		request: Partial<ScheduleEvent>;
		response: ScheduleEvent[];
	};

	UPDATE: {
		request: ScheduleEvent;
		response: ScheduleEvent[];
	};

	REMOVE: {
		params: { id: ScheduleEvent['id'] };
		response: ScheduleEvent[];
	};
};
