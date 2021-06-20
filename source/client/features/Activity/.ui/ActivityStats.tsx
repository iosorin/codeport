import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Block } from '@ui';
import { Store } from '../store';

type Props = {
	store: Store;
};

export const ActivityStats: FC<Props> = observer(({ store }) => {
	return (
		<div className='grid grid--25 mb-1'>
			<Block background='black' flex>
				<small>Сonferences</small>
				<b className='h2'>{store.events.length}</b>
			</Block>

			<Block background='black' flex>
				<small>Total time</small>
				<b className='h2'>{store.total.time} min.</b>
			</Block>

			<Block background='black' flex>
				<small>Snippets</small>
				<b className='h2'>{store.total.snippets}</b>
			</Block>
		</div>
	);
});
