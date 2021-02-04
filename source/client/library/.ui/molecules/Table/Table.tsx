import { date, groupByProp, sortByProp } from '@/library/utils';
import { ChevronDown, Edit3, Eye, Minus, Trash, X } from 'react-feather';
import React, { FC, HTMLProps, useEffect, useRef, useState } from 'react';
import styles from './table.scss';
import { Color, Input } from '../..';

type Item = {
    id: string | number;
    [key: string]: string | number | Date | JSX.Element | any[];
};

type Props = {
    caption?: string;
    num?: string;
    color?: string;
    source: Item[];
    labels?: string[];
    sortable?: string[];
    prefixes?: { [key: string]: string };
    background?: 'light' | 'dark' | 'none';
    groupBy?: string;
    onTrClick?: (item?: any) => void;
    onDelete?: (item?: any) => void;
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
    onDelete,
    prefixes,
}) => {
    const [, forceUpdate] = useState(0);

    const [source, setSource] = useState(origin);
    const [labels, setLabels] = useState(originLabels);
    const sortedMap = useRef<Map<string, 'up' | 'down' | 'inactive'>>(new Map());

    const showDeleteIcon = !!onDelete;

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
                    <ChevronDown size="17" />
                </div>
            )
        );
    };

    const renderDeleteIcon = (item: Item) => {
        return (
            showDeleteIcon && (
                <td
                    className="text-center"
                    onClick={(event) => {
                        event.stopPropagation();
                        onDelete!(item);
                    }}
                >
                    <Trash className="hoverable" size="14" />
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

                    {showDeleteIcon && <th></th>}
                </tr>
            </thead>
        );
    };

    const renderTd = (key: string | boolean, item: Item, index: number) => {
        let value = item[key as string];

        if (!key || typeof value === 'undefined' || key === 'id' || !item) {
            return <td key={index}></td>;
        }

        const prefix = prefixes?.[key as keyof typeof prefixes];

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

        return <td key={`${item.id}-${key}`}>{value}</td>;
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
                                    <Color color={item[color] as string} size="small" />
                                </td>
                            )}

                            {labels?.map((label, index) => {
                                return renderTd(label, item, index);
                            })}

                            {renderDeleteIcon(item)}
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
                    {items.map((item, itemIndex) => {
                        return (
                            <tr
                                key={(item.id as string) || itemIndex}
                                onClick={() => onTrClick?.(item)}
                            >
                                {labels?.map((label, index) => {
                                    const renderLabel = label === groupBy ? itemIndex === 0 : true;

                                    return renderTd(renderLabel && label, item, index);
                                })}

                                {renderDeleteIcon(item)}
                            </tr>
                        );
                    })}
                </tbody>
            );
        });
    };

    return (
        <table
            className={`${styles.table} ${styles[background]} ${onTrClick ? styles.clickable : ''}`}
        >
            {caption && <caption>{caption}</caption>}

            {renderThead()}

            {groupBy ? renderGroupedTbody() : renderTbody()}
        </table>
    );
};
