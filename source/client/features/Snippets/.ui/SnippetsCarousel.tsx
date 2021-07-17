import React, { FC } from 'react';
import type { Snippet as TSnippet } from 'types';
import { Carousel } from '@ui';
import { Snippet } from './Snippet';

type Props = {
	snippets: TSnippet[];
	loading?: boolean;
	light?: boolean;
	onSave?: (snippet: TSnippet) => void | Promise<void>;
};

export const SnippetsCarousel: FC<Props> = ({ snippets, loading, light, onSave }) => {
	return (
		<div className='flex-col fill'>
			{snippets.length ? (
				<Carousel align='end' navigation='arrows' navigationDisabled={loading}>
					{snippets.map((snippet) => (
						<Snippet
							key={snippet.id}
							snippet={snippet}
							light={light}
							onSave={onSave}
							className='fill'
						/>
					))}
				</Carousel>
			) : (
				<div className='text-grey'>No snippets was saved</div>
			)}
		</div>
	);
};
