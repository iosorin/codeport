import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { BaseLayout } from '@ui/layouts';
import { Block } from '@ui';

export const NotificationsView: FC = () => (
	<BaseLayout>
		<h1>Notifications</h1>

		<>
			<div className='grid grid-y scrollable' style={{ width: '45%' }}>
				<Block
					background='black'
					icon='🚀'
					size='small'
					small='Jun 4 2020 at 5:35 am'
					styled
					title='Hurray! The project has been launched'
				>
					<p>
						All basic information about project goals and usage tips you can
						find <Link to='/activity'>here</Link>
					</p>
				</Block>

				<Block
					background='black'
					icon='💃'
					size='small'
					small='Jun 4 2020 at 5:35 am'
					styled
					title='You have successfully logged via github'
				>
					<p>
						Go to <Link to='/activity'>profile settings</Link>
					</p>
				</Block>

				<Block
					background='yellow'
					icon='👨‍🚀'
					size='small'
					small='Start date - Jun 4 2020 at 5:35 am'
					styled
					title='"Citymax" conference starts in 45 minutes'
				>
					<Link to='/activity'>View details</Link>
				</Block>
			</div>
		</>
	</BaseLayout>
);
