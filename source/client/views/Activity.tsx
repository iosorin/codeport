import React, { FC, useState } from 'react';
import { BaseLayout } from '@layouts';
import { Block, Stats, Table } from '@ui';
import { ScheduleEventStrict } from 'types';
import { uuid } from '@/library/utils';

type Item = ScheduleEventStrict & {
    rating: number;
    gists: string[];
};

const source = [
    {
        id: uuid(),
        title: 'Conference 1',
        date: 1611696824940,
        rating: 4.2,
        gists: ['1221', '212'],
        stack: 'stack',
        salary: 'salary',
        contacts: 'contacts',
        additional: 'additional',
    },
    {
        id: uuid(),
        title: 'Conference 2',
        date: 1611696824940,
        rating: 5.5,
        gists: ['1221', '212'],
        stack: 'stack',
        salary: 'salary',
        contacts: 'contacts',
        additional: 'additional',
    },
    {
        id: uuid(),
        title: 'Conference 3',
        date: 1611696824940,
        rating: 5.5,
        gists: ['1221', '212'],
        stack: 'stack',
        salary: 'salary',
        contacts: 'contacts',
        additional: 'additional',
    },
    {
        id: uuid(),
        title: 'Conference 4',
        date: 1611696824941,
        rating: 3.2,
        gists: ['1221', '212'],
        stack: 'stack',
        salary: 'salary',
        contacts: 'contacts',
        additional: 'additional',
    },
];

export const ActivityView: FC = () => {
    const [exist, setexist] = useState(true);
    const [dialogIsVisible, setDialogIsVisible] = useState(false);

    return (
        <BaseLayout>
            {/* eslint-disable-next-line */}
            <h1 onClick={() => setexist((v: boolean) => !v)}>Activity</h1>

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
                    <Stats size={15} source={source} />
                </div>

                {exist && (
                    <div className="mt-1">
                        <Table
                            background="light"
                            labels={['title', 'stack', 'salary', 'date', 'rating']}
                            sortable={['date', 'rating']}
                            source={source}
                            trClick={(e: any) => console.log(e)}
                        />
                    </div>
                )}
            </div>
        </BaseLayout>
    );
};
