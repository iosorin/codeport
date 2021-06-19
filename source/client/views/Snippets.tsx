import React, { FC } from 'react';
import { BaseLayout } from '@ui/layouts';
import { Snippets } from '@/features/Snippets';

export const SnippetsView: FC = () => (
	<BaseLayout>
		<h1>Snippets</h1>

		<Snippets />
	</BaseLayout>
);
