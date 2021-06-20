import React, { FC } from 'react';
import { Observer } from 'mobx-react-lite';
import { Sidebar } from '@/router/Sidebar';
import { BlankLayout } from '@ui/layouts';
import { always } from '@core';
import styles from './base-layout.scss';

type Props = {
	wide?: boolean;
	centered?: boolean;
};

export const BaseLayout: FC<Props> = ({ wide, centered, children }) => {
	const ui = always('ui');

	const classlist = [styles.content];

	if (wide) classlist.push(styles.wide);
	if (centered) classlist.push(styles.centered);

	return (
		<BlankLayout>
			<Observer>
				{() => (
					<Sidebar className={styles.sidebar} visible={ui.sidebarVisible} />
				)}
			</Observer>

			<div className={classlist.join(' ')}>{children}</div>
		</BlankLayout>
	);
};
