import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Block } from '@ui';
import { useRoot } from '@/core';

export const Stats: FC = observer(() => {
    const { activity: store } = useRoot();

    return (
        <div className="grid grid--25 mb-1">
            <Block background="black" flex>
                <small>Сonferences</small>
                <b className="h2">{store.events.length}</b>
            </Block>

            <Block background="black" flex>
                <small>Total time</small>
                <b className="h2">{store.total.time} min.</b>
            </Block>

            <Block background="black" flex>
                <small>Snippets</small>
                <b className="h2">{store.total.snippets}</b>
            </Block>
        </div>
    );
});
