import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { always } from '@core';
import { SnippetsList } from './.ui';

export const Snippets: FC = observer(() => {
	const store = always('snippets');

	useEffect(() => {
		store.fetch();
	}, [store]);

	return (
		<div>
			<div className='h3'>Total: {store.snippets.length}</div>

			<SnippetsList snippets={store.snippets} />
		</div>
	);
});
