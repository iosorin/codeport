import { date, groupByProp, sortByProp } from '@/library/utils';
import { ChevronDown, Edit3, Eye, MoreHorizontal, Trash } from 'react-feather';
import React, { FC, HTMLProps, useEffect, useRef, useState } from 'react';
import styles from './table.scss';
import { Color } from '../..';
import { Menu } from '../Menu';

type Item = {
	[key: string]: string | number | Date | JSX.Element | any[];
};

type Props = {
	caption?: string;
	num?: string;
	color?: string;
	source: Item[];
	labels?: string[];
	sortable?: string[];
	background?: 'light' | 'dark' | 'none';
	groupBy?: string;
	onTrClick?: (item?: any) => void;
	onEdit?: (item?: any) => void;
	onDelete?: (item?: any) => void;
	onDetails?: (item?: any) => void;
	prefixes: { [key: string]: string };
};

export const Table: FC<Props> = ({
	num,
	color,
	caption,
	source: origin,
	labels: originLabels,
	sortable,
	background = 'none',
	groupBy,
	onTrClick,
	onEdit,
	onDelete,
	onDetails,
	prefixes,
}) => {
	const [source, setSource] = useState(origin);
	const [labels, setLabels] = useState(originLabels);
	const sortedMap = useRef<Map<string, 'up' | 'down' | 'inactive'>>(new Map());

	const showMenu = Boolean(onEdit || onDelete || onDetails);

	useEffect(() => {
		if (!originLabels) {
			setLabels(origin.length ? Object.keys(origin[0]) : []);
		}

		sortable?.forEach((label) => {
			sortedMap.current.set(label, 'inactive');
		});

		if (groupBy) {
			groupSource();
		}
	}, []);

	const sortSource = (prop: string) => {
		if (groupBy) {
			if (process.env.NODE_ENV === 'development') {
				console.warn('@ui/Table - unable to sort grouped source');
			}

			return;
		}

		const toggled = !(sortedMap.current.get(prop) === 'up');

		sortedMap.current.forEach((_, key, map) => {
			if (key === prop) map.set(prop, toggled ? 'up' : 'down');
			else map.set(key, 'inactive');
		});

		setSource([...sortByProp(source, prop, toggled)]);
	};

	const groupSource = () => {
		if (!groupBy || !source.length) return;

		setSource(groupByProp(source, groupBy));
	};

	const renderSortIcon = (label: string) => {
		const classlist = [styles.sort];

		const value = sortedMap.current.get(label);

		if (value === 'up' || value === 'down') {
			classlist.push(styles.current);

			if (value === 'up') {
				classlist.push(styles.up);
			}
		}

		return (
			sortable?.includes(label) && (
				<div className={classlist.join(' ')} onClick={() => sortSource(label)}>
					<ChevronDown size='17' />
				</div>
			)
		);
	};

	const renderMenu = (item: Item) => {
		return (
			showMenu && (
				<td>
					<Menu
						showOnHover
						onEdit={onEdit && (() => onEdit(item))}
						onDelete={onDelete && (() => onDelete(item))}
						onDetails={onDetails && (() => onDetails(item))}
					/>
				</td>
			)
		);
	};

	const renderThead = () => {
		return (
			<thead>
				<tr>
					{num && <th className={styles.num}>{num}</th>}
					{color && <th className={styles.color}></th>}

					{labels?.map((label) => {
						if (label === 'id') return;

						return (
							<th key={label}>
								{label}

								{renderSortIcon(label)}
							</th>
						);
					})}

					{showMenu && <th></th>}
				</tr>
			</thead>
		);
	};

	const renderTd = (key: string | boolean, item: Item, index: number) => {
		let value = item[key as string];
		const prefix = prefixes[key as keyof typeof prefixes];

		if (!key || typeof value === 'undefined' || key === 'id' || !item) {
			return <td key={index}></td>;
		}

		if (Array.isArray(value)) {
			value = value.length;
		}

		if (value instanceof Date || key === 'date') {
			//@ts-ignore
			value = date.when(value);
		}

		if (prefix) {
			value += prefix;
		}

		return <td key={index}>{value}</td>;
	};

	const renderTbody = () => {
		return (
			<tbody>
				{source.map((item, itemIndex) => {
					return (
						<tr
							key={(item.id as string) || itemIndex}
							onClick={() => onTrClick?.(item)}
						>
							{num && <td className={styles.num}>{itemIndex + 1}</td>}

							{color && (
								<td className={styles.color}>
									<Color color={item[color] as string} size='dot' />
								</td>
							)}

							{labels?.map((label, index) => {
								return renderTd(label, item, index);
							})}

							{renderMenu(item)}
						</tr>
					);
				})}
			</tbody>
		);
	};

	const renderGroupedTbody = () => {
		return Object.keys(source).map((groupByValue) => {
			// @ts-ignore
			const items: Item[] = source[groupByValue as keyof typeof source];

			if (!items.length) return;

			return (
				<tbody>
					{items.map((item, index) => {
						return (
							<tr
								key={(item.id as string) || index}
								onClick={() => onTrClick?.(item)}
							>
								{labels?.map((label, index) => {
									const renderLabel = label === groupBy ? index === 0 : true;

									return renderTd(renderLabel && label, item, index);
								})}

								{renderMenu(item)}
							</tr>
						);
					})}
				</tbody>
			);
		});
	};

	return (
		<table
			className={`${styles.table} ${styles[background]} ${
				onTrClick ? styles.clickable : ''
			}`}
		>
			{caption && <caption>{caption}</caption>}

			{renderThead()}

			{groupBy ? renderGroupedTbody() : renderTbody()}
		</table>
	);
};
