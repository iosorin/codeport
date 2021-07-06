import React, { FC } from 'react';
import { standard } from './preset';
import styles from './emojis.scss';

type Props = {
	value?: number | string;
	size?: 'small' | 'medium' | 'large';
};

export const Emoji: FC<Props> = ({ value, size = 'medium' }) => {
	const emoji = standard.find((item) => item.value == value);

	return emoji ? <span className={`${styles.emoji} ${styles[size]}`}>{emoji.icon}</span> : null;
};
