import React, { FC } from 'react';
import logo from '@media/logo/9.svg';

import styles from './logo.scss';

type Props = {
	short?: boolean;
	className?: string;
};

export const Logo: FC<Props> = ({ className = '', short }) => {
	const classname = [styles.logo, className];

	return (
		<div className={classname.join(' ')}>
			<svg>
				<use href={`${logo}#logo-short`} />
			</svg>

			{!short && <span>{process.env.TITLE}</span>}
		</div>
	);
};
