import type { Snippet } from 'types';

export type SnippetsContract = {
	GET: {
		response: Snippet[];
	};

	CREATE: {
		request: Partial<Snippet>;
		response: Snippet[];
	};

	UPDATE: {
		request: Snippet;
		response: Snippet[];
	};

	REMOVE: {
		params: { id: Snippet['id'] };
		response: Snippet[];
	};
};
