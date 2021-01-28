import { date, groupByProp, sortByProp } from '@/library/utils';
import { ChevronDown } from 'react-feather';
import React, { FC, HTMLProps, useEffect, useRef, useState } from 'react';
import styles from './table.scss';

type Item = {
    [key: string]: string | number | Date | JSX.Element | any[];
};

type Props = {
    caption?: string;
    num?: string;
    source: Item[];
    labels?: string[];
    sortable?: string[];
    background?: 'light' | 'dark' | 'none';
    groupBy?: string;
    trClick?: (item?: any) => void;
};

export const Table: FC<HTMLProps<HTMLTableElement> & Props> = ({
    num,
    caption,
    source: origin,
    labels: originLabels,
    sortable,
    background = 'none',
    groupBy,
    trClick,
    ...props
}) => {
    const [source, setSource] = useState(origin);
    const [labels, setLabels] = useState(originLabels);
    const sortedMap = useRef<Map<string, 'up' | 'down' | 'inactive'>>(new Map());

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

    const renderThead = () => {
        return (
            <thead>
                <tr>
                    {num && <th className={styles.num}>{num}</th>}

                    {labels?.map((label) => {
                        if (label === 'id') return;

                        return (
                            <th key={label}>
                                {label}

                                {renderSortIcon(label)}
                            </th>
                        );
                    })}
                </tr>
            </thead>
        );
    };

    const renderTd = (key: string | boolean, item: Item, index: number) => {
        let value = item[key as string];

        if (!key || key === 'id' || !item || !value || Array.isArray(value)) {
            return (
                <td key={index}>
                    <span className="text-grey">-</span>;
                </td>
            );
        }

        if (value instanceof Date || key === 'date') {
            //@ts-ignore
            value = date.when(value);
        }

        return <td key={index}>{value}</td>;
    };

    const renderTbody = () => {
        return (
            <tbody>
                {source.map((item, itemIndex) => {
                    return (
                        <tr key={(item.id as string) || itemIndex} onClick={() => trClick?.(item)}>
                            {num && <td className={styles.num}>{itemIndex + 1}</td>}

                            {labels?.map((label, index) => {
                                return renderTd(label, item, index);
                            })}
                        </tr>
                    );
                })}
            </tbody>
        );
    };

    const renderGroupedTbodys = () => {
        return Object.keys(source).map((groupByValue) => {
            // @ts-ignore
            const items: Item[] = source[groupByValue as keyof typeof source];

            if (!items.length) return;

            return (
                <tbody>
                    {items.map((item, itemIndex) => {
                        return (
                            <tr>
                                {labels?.map((label, index) => {
                                    const renderLabel = label === groupBy ? itemIndex === 0 : true;

                                    return renderTd(renderLabel && label, item, index);
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            );
        });
    };

    return (
        <table
            className={`${styles.table} ${styles[background]} ${trClick ? styles.clickable : ''}`}
            {...props}
        >
            {caption && <caption>{caption}</caption>}

            {renderThead()}

            {groupBy ? renderGroupedTbodys() : renderTbody()}
        </table>
    );
};
