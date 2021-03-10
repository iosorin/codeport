import React from 'react';
import styles from './tabs.scss';

type Props<T> = {
    active: T;
    list: T[];
    align: 'left' | 'center' | 'right';
    bordered?: boolean;
    dark?: boolean;
    onChange: (tab: T) => void;
};

export const Tabs = <T,>({
    active,
    list,
    align = 'left',
    bordered,
    dark,
    onChange,
}: Props<T>): JSX.Element => {
    const classlist = [styles.tabs, styles[align]];

    if (dark) classlist.push(styles.dark);
    if (bordered) classlist.push(styles.bordered);

    return (
        <div className={classlist.join(' ')}>
            {list.map((tab, index) => (
                <div
                    key={index}
                    onClick={() => onChange(tab)}
                    className={`${styles.tab} ${active === tab ? styles.active : ''}`}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
};
