import React, { FC } from 'react';
import type { Snippet as TSnippet } from 'types';
import { Carousel, Block } from '@ui';
import { Snippet } from './Snippet';

type Props = {
    snippets: TSnippet[];
    loading?: boolean;
    onSave?: (snippet: TSnippet) => void | Promise<void>;
};

export const SnippetsCarousel: FC<Props> = ({ snippets, loading, onSave }) => {
    return (
        <div className="flex-col fill">
            <Block background="light" flex size="small">
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
