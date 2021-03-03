import React, { FC } from 'react';
import { Block } from '@ui';

type Props = {
    total: {
        time: number;
        snippets: number;
    };
    length: number;
};

export const Stats: FC<Props> = ({ length, total }) => {
    return (
        <div className="grid grid--25 mb-1">
            <Block background="black" flex>
                <small>Сonferences</small>
                <b className="h2">{length}</b>
            </Block>

            <Block background="black" flex>
                <small>Total time</small>
                <b className="h2">{total.time} min.</b>
            </Block>

            <Block background="black" flex>
                <small>Snippets</small>
                <b className="h2">{total.snippets}</b>
            </Block>
        </div>
    );
};
