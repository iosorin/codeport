import React from 'react';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { always } from '@core';
import { Transition } from '..';
import { TransitionGroup } from 'react-transition-group';
import styles from './toasts.scss';

export const Toasts = observer(() => {
	let { toasts } = always('toast');

	return createPortal(
		<>
			<TransitionGroup className={styles.toasts}>
				{toasts.map((toast) => (
					<Transition
						key={toast.id}
						in={toast.display}
						duration='500'
						type='slide-fade-left'
					>
						<div className={classNames(styles.toast, styles[toast.type])}>
							{toast.message}
						</div>
					</Transition>
				))}
			</TransitionGroup>
		</>,
		document.body
	);
});
