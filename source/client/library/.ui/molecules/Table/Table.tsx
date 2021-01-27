import { date, sortByProp } from '@/library/utils';
import { ChevronDown } from 'react-feather';
import React, { FC, HTMLProps, useEffect, useRef, useState } from 'react';
import styles from './table.scss';

type Item = {
    [key: string]: string | number | Date | React.FunctionComponent;
};

type Props = {
    caption?: string;
    num?: string;
    source: Item[];
    labels?: string[];
    sortable?: string[];
    background?: 'light' | 'dark' | 'none';
    groupBy?: string;
};

export const Table: FC<HTMLProps<HTMLTableElement> & Props> = ({
    num,
    caption,
    source: origin,
    labels: originLabels,
    sortable,
    background = 'none',
    groupBy,
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
    }, []);

    const sortSource = (label: string) => {
        const toggled = !(sortedMap.current.get(label) === 'up');

        sortedMap.current.forEach((_, key, map) => {
            if (key === label) map.set(label, toggled ? 'up' : 'down');
            else map.set(key, 'inactive');
        });

        setSource([...sortByProp(source, label, toggled)]);
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
        );
    };

    const renderTbody = () => {
        return source.map((item, index) => {
            return (
                <tr key={(item.id as string) || index}>
                    {num && <td className={styles.num}>{index + 1}</td>}

                    {labels?.map((label, index) => {
                        if (label === 'id') return;

                        const Value = item[label];

                        if (typeof Value === 'string' || typeof Value === 'number') {
                            return <td key={index}>{Value}</td>;
                        }

                        if (Value instanceof Date) {
                            return <td key={index}>{date.when(Value)}</td>;
                        }

                        return (
                            <td key={index}>
                                <Value />
                            </td>
                        );
                    })}
                </tr>
            );
        });
    };

    return (
        <table className={`${styles.table} ${styles[background]} `} {...props}>
            {caption && <caption>{caption}</caption>}

            <thead>{renderThead()}</thead>

            <tbody>{renderTbody()}</tbody>
        </table>
    );
};
