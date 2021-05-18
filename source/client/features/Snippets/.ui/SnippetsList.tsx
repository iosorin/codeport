import React, { FC } from 'react';
import type { Snippet as TSnippet } from 'types';
import { Block } from '@ui';
import { Snippet } from './Snippet';

type Props = {
    snippets: TSnippet[];
};

export const SnippetsList: FC<Props> = ({ snippets }) => {
    return (
        <div className="flex-col fill">
            {snippets.length ? (
                snippets.map((snippet) => (
                    <Block key={snippet.id} className="mb-2" background="light" flex size="small">
                        <Snippet key={snippet.id} snippet={snippet} />
                    </Block>
                ))
            ) : (
                <div className="text-grey">No snippets was saved</div>
            )}
        </div>
    );
};
