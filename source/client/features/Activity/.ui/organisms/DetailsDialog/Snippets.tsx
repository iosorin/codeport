import { Block } from '@/library/.ui';
import React, { FC } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';

type Props = {
    snippets: string[];
    setSnippets: (snippets: string[]) => void;
};

export const Snippets: FC<Props> = ({ snippets }) => {
    return (
        <div className="flex-col">
            <Block empty flex>
                <div className="h4 text-grey">No snippets was saved</div>
                <div>{snippets.length}</div>
            </Block>

            <div className="flex flex-end mt-2 disabled">
                <ArrowLeft className="mr-2" color="white" size="18" />

                <ArrowRight color="white" size="18" />
            </div>
        </div>
    );
};
