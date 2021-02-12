import React, { FC } from 'react';
import { CodeSnippet } from 'types';
import { Carousel, Block } from '@ui';
import { Snippet } from './Snippet';

type Props = {
    snippets: CodeSnippet[];
};

export const Snippets: FC<Props> = ({ snippets }) => {
    return (
        <div className="flex-col fill">
            <Block background="light" flex p0>
                {snippets.length ? (
                    <Carousel navigation="arrows" align="end">
                        {snippets.map((snippet, idx) => (
                            <Snippet snippet={snippet} key={idx} />
                        ))}
                    </Carousel>
                ) : (
                    <div className="text-grey">No snippets was saved</div>
                )}
            </Block>
        </div>
    );
};
