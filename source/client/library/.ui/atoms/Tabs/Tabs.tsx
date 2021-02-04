import React from 'react';
import { Button } from '..';

type Props<T> = {
    active: T;
    list: T[];
    onChange: (tab: T) => void;
};

export const Tabs = <T,>({ active, list, onChange }: Props<T>): JSX.Element => {
    return (
        <>
            {list.map((tab, index) => (
                <Button
                    onClick={() => onChange(tab)}
                    size="small"
                    background={active === tab ? 'primary' : 'light'}
                    className={index === list.length - 1 ? '' : 'mr-xs'}
                >
                    {tab}
                </Button>
            ))}
        </>
    );
};
