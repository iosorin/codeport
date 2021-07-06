import React, { useState } from 'react';
import classNames from 'classnames';
import { ChevronDown } from 'react-feather';
import { useOutsideClick } from '@hooks';
import styles from './select.scss';

export type Props<T> = {
	label?: string;
	value: T;
	valueKey?: keyof T & string;
	titleKey?: keyof T & string;
	options: T[];
	tabIndex?: number | undefined;
	onChange: (value: T) => void;
};
export const Select = <T,>({
	label,
	value,
	valueKey,
	titleKey,
	options = [],
	tabIndex = 1,
	onChange,
}: Props<T>): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [ref] = useOutsideClick(() => setOpen(false));

	const pick = (option: T, key?: keyof T) => (key ? option[key] : option);

	const selectHandler = (option: T) => {
		onChange(option);
		setOpen(false);
	};

	return (
		<div ref={ref} className={`${styles.select} ${open ? styles.isOpen : ''}`} tabIndex={tabIndex}>
			{label ? <div className='label'>{label}</div> : null}

			<div className={styles.value} onClick={() => setOpen(!open)}>
				<span>{pick(value, titleKey)}</span>

				<span className='append'>
					<ChevronDown size='16' />
				</span>
			</div>

			<ul
				className={classNames(styles.options, {
					[styles.visible]: open,
				})}
			>
				{options.map((option, index) => {
					const title = pick(option, titleKey);
					const selected = pick(option, valueKey) === pick(value, valueKey);

					return (
						<li
							key={index}
							aria-selected={selected}
							className={classNames(styles.option, {
								[styles.selected]: selected,
							})}
							onClick={() => selectHandler(option)}
							role='option'
						>
							{title}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
