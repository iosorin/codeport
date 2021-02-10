import React, { FC } from 'react';
import { CodeSnippet } from 'types';

type Props = {
    snippet: CodeSnippet;
};

export const Snippet: FC<Props> = ({ snippet }) => {
    return <div>{snippet.content}</div>;
};
