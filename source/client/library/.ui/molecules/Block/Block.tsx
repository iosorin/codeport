import classNames from 'classnames';
import React, { FC, memo } from 'react';
import { Edit, X } from 'react-feather';
import { Button } from '../../atoms';
import styles from './block.scss';

type Props = {
	title?: string;
	icon?: string | JSX.Element;
	small?: string | number | JSX.Element | null;
	size?: 'small' | 'medium' | 'large';
	background?: 'light' | 'grey' | 'dark' | 'black' | 'primary' | 'success' | 'yellow' | 'none';
	color?: 'black' | 'white';
	customBackground?: string;
	flex?: boolean;
	hover?: boolean;
	styled?: boolean;
	controlsInBottom?: boolean;
	height?: string;
	className?: string;
	onEdit?: () => void;
	onRemove?: () => void;
	onClick?: () => void;
};

export const Block: FC<Props> = memo(
	({
		title,
		size = 'medium',
		background = 'dark',
		color = 'white',
		height: minHeight = '',
		icon,
		small,
		flex,
		hover,
		styled,
		controlsInBottom,
		className = '',
		onEdit,
		onRemove,
		onClick,
		children,
	}) => {
		const controls = (
			<div className={styles.controls}>
				{onEdit && (
					<Button rounded hover background='grey' size='small' onClick={onEdit}>
						<Edit size='15' />
					</Button>
				)}

				{onRemove && (
					<Button rounded hover background='grey' size='small' onClick={onRemove}>
						<X size='17' />
					</Button>
				)}
			</div>
		);

		return (
			<div
				className={classNames(
					className,
					styles.block,
					styles[size],
					styles[`color-${color}`],
					styles[background],
					{
						className,
						pointer: Boolean(onClick),
						[styles.flex]: flex,
						[styles.hover]: hover,
						[styles.styled]: styled,
					}
				)}
				style={{ minHeight }}
				onClick={onClick}
			>
				{(title || onEdit || onRemove) && (
					<div className={styles.header}>
						{title && <h4>{title}</h4>}

						{!controlsInBottom && controls}
					</div>
				)}

				<div className={styles.content}>{children}</div>

				{(icon || small || controlsInBottom) && (
					<div className={styles.footer}>
						{icon && <span>{icon}</span>}
						{small && <small>{small}</small>}

						{controlsInBottom && controls}
					</div>
				)}
			</div>
		);
	}
);
