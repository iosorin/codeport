import { useEffect } from 'react';

export const useDocumentTitle = (title: string | undefined): void => {
    useEffect(() => {
        if (title) {
            document.title = `${process.env.TITLE} - ${title}`;
        }
    }, [title]);
};
