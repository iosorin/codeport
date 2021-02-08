import React, { FC } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { Block } from '@ui';

type Props = {
    snippets: string[];
};

export const Snippets: FC<Props> = ({ snippets }) => {
    return (
        <div className="flex-col fill disabled" style={{ maxHeight: '295px' }}>
            <Block background="grey" flex>
                <div className="text-grey">No snippets was saved</div>
            </Block>
        </div>
    );

    return (
        <div className="flex-col fill disabled">
            <Block background="grey" flex>
                <div className="text-grey">No snippets was saved</div>
            </Block>

            <div className="flex flex-end mt-2 disabled">
                <ArrowLeft className="mr-2" size="18" />

                <ArrowRight size="18" />
            </div>
        </div>
    );
};
