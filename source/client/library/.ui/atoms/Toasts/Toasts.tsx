import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { Toast } from '@/stores/toast.store';
import { Transition } from '..';
import { TransitionGroup } from 'react-transition-group';
import styles from './toasts.scss';

type Props = {
	toasts: Toast[];
};

export const Toasts: FC<Props> = observer(({ toasts }) => {
	return createPortal(
		<>
			<TransitionGroup className={styles.toasts}>
				{toasts.map((toast) => (
					<Transition key={toast.id} in={toast.display} duration={500} type='slide-fade-left'>
						<div className={classNames(styles.toast, styles[toast.type])}>{toast.message}</div>
					</Transition>
				))}
			</TransitionGroup>
		</>,
		document.body
	);
});
