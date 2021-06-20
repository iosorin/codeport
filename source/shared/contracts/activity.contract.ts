import type { ActivityEvent, NewEvent } from 'types';

export type ActivityContract = {
	GET: { response: ActivityEvent[] };

	CREATE: {
		response: ActivityEvent[];
	};

	UPDATE: {
		request: NewEvent;
		response: ActivityEvent[];
	};

	REMOVE: {
		params: { id: ActivityEvent['id'] };
		response: ActivityEvent[];
	};
};
