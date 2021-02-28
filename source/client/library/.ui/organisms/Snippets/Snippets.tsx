import React, { FC } from 'react';
import { CodeSnippet } from 'types';
import { Carousel, Block } from '@ui';
import { Snippet } from './Snippet';

type Props = {
    snippets: CodeSnippet[];
    loading?: boolean;
    onSave?: (snippet: CodeSnippet) => void | Promise<void>;
};

export const Snippets: FC<Props> = ({ snippets, loading, onSave }) => {
    return (
        <div className="flex-col fill">
            <Block background="light" flex p0>
                {snippets.length ? (
                    <Carousel align="end" navigation="arrows" navigationDisabled={loading}>
                        {snippets.map((snippet) => (
                            <Snippet key={snippet.id} snippet={snippet} onSave={onSave} />
                        ))}
                    </Carousel>
                ) : (
                    <div className="text-grey">No snippets was saved</div>
                )}
            </Block>
        </div>
    );
};
