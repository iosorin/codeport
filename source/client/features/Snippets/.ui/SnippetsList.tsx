import React, { FC } from 'react';
import type { Snippet as TSnippet } from 'types';
import { Block } from '@ui';
import { Snippet } from './Snippet';

type Props = {
	snippets: TSnippet[];
};

export const SnippetsList: FC<Props> = ({ snippets }) => {
	if (!snippets.length) return <div className='text-grey'>No snippets was saved</div>;

	return (
		<div className='flex flex-wrap fill'>
			{snippets.map((snippet) => (
				<Snippet key={snippet.id} className='my-2' snippet={snippet} />
			))}
		</div>
	);
};
