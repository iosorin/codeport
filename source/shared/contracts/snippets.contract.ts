import { Optional, Snippet } from 'types';

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

/*
POST: {
    body: {
        username: string;
        password: string;
    };
    response: {
        token: {
            id: string;
            expires: string;
        };
        user: {
            id: string;
            name: string;
            defaultAddress: string;
            hasPaymentMethod: boolean;
        };
    };
};
GET: {
    query: {
        nearLocation: string;
        cuisineType?: string;
    };
    response: any[]; // recommended: Restaurent[], imported from another file
};


'/me/orders/:id': {
        DELETE: {
            params: {
                id: string;
            };
            response: {
                success: boolean;
                refundAmount?: string;
            };
        };
    };
*/
