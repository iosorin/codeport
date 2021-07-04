import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useOutsideClick } from '@hooks';

import styles from './select.scss';
import classNames from 'classnames';

export type Props<T> = {
	label?: string;
	value?: T;
	valueKey?: string;
	titleKey?: string;
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
	tabIndex,
	onChange,
}: Props<T>): JSX.Element => {
	const [open, setOpen] = useState(false);

	const selectHandler = (option: T) => {
		onChange(option);
		setOpen(false);
	};

	const [ref] = useOutsideClick(() => setOpen(false));

	const getValue = (option: T) => (valueKey ? option[valueKey as keyof T] : option);
	const getTitle = (option: T) => (titleKey ? option[titleKey as keyof T] : option);

	return (
		<div ref={ref} className={`${styles.select} ${open ? styles.isOpen : ''}`} tabIndex={tabIndex}>
			{label ? <div className='label'>{label}</div> : null}

			<div className={styles.value} onClick={() => setOpen(!open)}>
				<span>{value}</span>

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
					const title = getTitle(option);
					const selected = getValue(option) === value;

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
