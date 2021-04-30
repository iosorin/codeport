import { useSnippets } from '@core';
import React, { FC, useEffect } from 'react';

export const Snippets: FC = () => {
    const store = useSnippets();

    useEffect(() => {
        store.fetch();
        // eslint-disable-next-line
    }, []);

    return <div>snippets</div>;
};
