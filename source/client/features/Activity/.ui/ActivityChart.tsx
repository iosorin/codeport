import React, { FC, useMemo } from 'react';
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
import { ScheduleEventStrict } from 'types';

type Props = {
    size?: number;
    events: ScheduleEventStrict[];
    height?: string | number;
    forceUpdate: boolean;
};

export const ActivityChart: FC<Props> = ({
    size = 15,
    height = 250,
    events: source,
    forceUpdate,
}) => {
    const data = useMemo(() => {
        if (!forceUpdate) return;

        const end = date.fixed();
        const start = new Date(date.addDays(-size, new Date(end)));
        const chartDays = date.getDates(start, end);

        return chartDays?.map((chartday) => {
            const events = source.filter((event) => date.match(event.date, chartday));

            return {
                Date: date.when(chartday, false),
                Events: events.length,
            };
        });
    }, [size, forceUpdate]);

    return (
        <div
            style={{
                width: 'calc(100% + 50px)',
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
