import React, { FC } from 'react';
import { BaseLayout } from '@ui/layouts';
import Human from '@media/human.svg';
import { Logo } from '@ui';

export const Landing: FC = () => (
	<BaseLayout>
		<div
			className='flex-col flex-center text-center'
			style={{ height: '100%' }}
		>
			<Logo />
			<img alt='hero' src={Human} style={{ margin: '15px 0 60px' }} />

			<h2>
				An online code-editor for interviews,
				<br /> troubleshooting, teaching & more…
			</h2>
		</div>
	</BaseLayout>
);
