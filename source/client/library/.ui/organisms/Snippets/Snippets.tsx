import React, { FC } from 'react';
import { CodeSnippet } from 'types';
import { Carousel, Block } from '@ui';
import { Snippet } from './Snippet';

type Props = {
    snippets: CodeSnippet[];
};

export const Snippets: FC<Props> = ({ snippets }) => {
    const isEmpty = !snippets.length;

    return (
        <div className={`flex-col fill ${isEmpty ? 'disabled' : ''}`}>
            <Block background="grey" flex>
                {isEmpty ? (
                    <div className="text-grey">No snippets was saved</div>
                ) : (
                    <Carousel>
                        {snippets.map((snippet) => (
                            <Snippet snippet={snippet} />
                        ))}
                    </Carousel>
                )}
            </Block>
        </div>
    );
};
