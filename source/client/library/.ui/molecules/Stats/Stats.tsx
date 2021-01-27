import React, { FC, memo, useMemo } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';
import { date } from '@/library/utils';

type Item = {
    date: Date;
    [key: string]: any;
};

type Props = {
    size?: number;
    source: Item[];
    height?: string | number;
};

export const Stats: FC<Props> = ({ size = 15, height = 250, source }) => {
    const data = useMemo(() => {
        const end = new Date();
        const start = new Date(new Date().setDate(end.getDate() - size));

        return date.getDates(start, end).map((d) => {
            const events = source.filter((event) => date.match(event.date, d));

            return {
                Date: date.when(d, false),
                Events: events.length,
            };
        });
    }, [size]);

    return (
        <div
            style={{
                width: 'calc(100% + 51px)',
                height,
                marginLeft: -50,
            }}
        >
            <ResponsiveContainer>
                <LineChart data={data}>
                    <Legend
                        align="left"
                        verticalAlign="bottom"
                        wrapperStyle={{ left: 60, bottom: 0 }}
                    />

                    <CartesianGrid strokeDasharray="3 3" />

                    <YAxis
                        // domain={[0, 'dataMax']}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                        interval="preserveStartEnd"
                        padding={{ top: 20, bottom: 20 }}
                    />

                    <XAxis
                        dataKey="Date"
                        tickLine={false}
                        axisLine={false}
                        padding={{ left: 20, right: 20 }}
                    />

                    <Line type="monotone" dataKey="Events" stroke="#fff" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
