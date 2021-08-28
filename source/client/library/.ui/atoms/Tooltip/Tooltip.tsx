import React, { FC, useState } from 'react';
import classNames from 'classnames';
import styles from './tooltip.scss';

type Props = {
	text: string;
	textDone?: string;
	left?: boolean;
	center?: boolean;
	bottom?: boolean;
	error?: boolean;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
};

export const Tooltip: FC<Props> = ({
	text,
	textDone,
	left,
	center,
	bottom,
	error,
	className = '',
	children,
	disabled,
	onClick,
}) => {
	const [content, setContent] = useState(text);

	const handleClick = () => {
		if (!onClick) return;

		onClick();

		if (textDone) {
			setContent(textDone);

			setTimeout(() => {
				setContent(text);
			}, 800);
		}
	};

	return (
		<div
			className={classNames(
				styles.tooltip,
				`${{
					disabled,
					[styles.error]: error,
					[styles.left]: left,
					[styles.center]: center,
					[styles.bottom]: bottom,
				}} ${className}`
			)}
			data-tooltip={content}
			onClick={handleClick}
		>
			{children}
		</div>
	);
};
