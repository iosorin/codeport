import React, { CSSProperties, FC, MouseEvent } from 'react';
import { Transition } from '../Transition';
import styles from './backdrop.scss';

export type Props = {
	style?: CSSProperties;
	visible?: boolean;
	onClick?: (e: MouseEvent) => void;
	msToShow?: number;
};

export const Backdrop: FC<Props> = ({
	style = {},
	visible = true,
	children,
	msToShow = 380,
	onClick = () => {},
}) => {
	return (
		<Transition duration={msToShow} in={visible} type='fade'>
			<div className={styles.Backdrop} onClick={onClick} style={{ ...style }}>
				{children}
			</div>
		</Transition>
	);
};
