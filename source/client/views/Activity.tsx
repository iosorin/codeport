import React, { FC, useState } from 'react';
import { BaseLayout } from '@layouts';
import { Block, Stats, Table } from '@ui';
import { date } from '@/library/utils';

const source = [
    {
        id: Math.random(),
        title: 'Conference 1',
        date: new Date(),
        rating: 4.2,
        time: '10',
    },
    {
        id: Math.random(),
        title: 'Conference 2',
        date: new Date(date.addDays(-4, new Date())),
        rating: 5.5,
        time: '10',
    },
    {
        id: Math.random(),
        title: 'Conference 3',
        date: new Date(),
        rating: 3.2,
        time: '10',
    },
    {
        id: Math.random(),
        title: 'Conference 4',
        date: new Date(1611696824940),
        rating: 5.5,
        time: '10',
    },
    {
        id: Math.random(),
        title: 'Conference 5',
        date: new Date(),
        rating: 3.2,
        time: '10',
    },
    {
        id: Math.random(),
        title: 'Conference 6',
        date: new Date(date.addDays(-2, new Date())),
        rating: 5.5,
        time: '10',
    },
    {
        id: Math.random(),
        title: 'Conference 7',
        date: new Date(),
        rating: 3.2,
        time: '10',
    },
];

export const ActivityView: FC = () => {
    const [exist, setexist] = useState(true);

    return (
        <BaseLayout>
            {/* eslint-disable-next-line */}
            <h1 onClick={() => setexist((v: boolean) => !v)}>Activity</h1>
            {/* <button onClick={() => setexist((v: boolean) => !v)} type="button">
                change
            </button> */}

            {!exist && (
                <p className="h4 text-grey mb-2">
                    The history of your activity will be recorded here
                </p>
            )}

            <div className={`flex flex-col ${exist ? '' : 'disabled'}`}>
                <div className="grid grid--25 mb-1">
                    <Block background="dark" square>
                        <small>Сonferences</small>
                        <b className="h3">12</b>
                    </Block>
                    <Block background="dark" square>
                        <small>Total time</small>
                        <b className="h3">40 min.</b>
                    </Block>
                    <Block background="dark" square>
                        <small>Saved gists</small>
                        <b className="h3">4</b>
                    </Block>
                </div>

                <div className="my-2">
                    <Stats size={15} source={exist ? source : []} />
                </div>

                {exist && (
                    <div className="mt-1">
                        <Table
                            background="light"
                            groupBy="date"
                            labels={['date', 'title', 'time', 'rating']}
                            // num="#"
                            sortable={['date', 'rating']}
                            source={source}
                        />
                    </div>
                )}
            </div>
        </BaseLayout>
    );
};
