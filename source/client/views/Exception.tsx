import React from 'react';
import { Link } from 'react-router-dom';
import { BaseLayout } from '@ui/layouts';

export const ExceptionView = (): JSX.Element => (
	<BaseLayout>
		<div
			className='flex-col flex-center'
			style={{ width: '100%', height: '100%' }}
		>
			<h1 className='text-center mb-2'>Page Not Found</h1>

			<Link to='/'>back home</Link>
		</div>
	</BaseLayout>
);
