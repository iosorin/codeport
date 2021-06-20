import { useSnippets } from '@core';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { SnippetsList } from './.ui';

export const Snippets: FC = observer(() => {
	const store = useSnippets();

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
