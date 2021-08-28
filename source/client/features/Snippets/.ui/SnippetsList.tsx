import React, { FC } from 'react';
import type { Snippet as TSnippet } from 'types';
import { Snippet } from './Snippet';

type Props = {
	snippets: TSnippet[];
};

export const SnippetsList: FC<Props> = ({ snippets }) => {
	if (!snippets.length) return <div className='text-grey'>No snippets was saved</div>;

	return (
		<div className='grid grid--3 fill'>
			{snippets.map((snippet) => (
				<Snippet
					key={snippet.id}
					snippet={snippet}
					style={{ maxHeight: 400 }}
					onSave={console.log}
				/>
			))}
		</div>
	);
};
