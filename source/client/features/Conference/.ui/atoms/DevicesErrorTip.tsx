import React, { FC } from 'react';
import { Slash } from 'react-feather';
import styles from './text.scss';

export const DevicesErrorTip: FC = () => {
	return (
		<div className={styles.text}>
			<Slash />

			<h5 className='my-2'>
				Check your camera <br />
				and microphone{' '}
				<a
					href='https://support.google.com/chrome/answer/2693767?co=GENIE.Platform%3DDesktop&hl=en'
					target='_blank'
				>
					permissions
				</a>
			</h5>
		</div>
	);
};
