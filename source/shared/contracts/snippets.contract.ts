import type { Optional, Snippet } from 'types';

export type SnippetsContract = {
    GET: {
        response: Snippet[];
    };

    CREATE: {
        request: Optional<Snippet, 'id'>;
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
