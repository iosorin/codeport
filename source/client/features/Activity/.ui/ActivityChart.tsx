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
import { date } from '@utils';
import type { ActivityEvent } from 'types';
import { observer } from 'mobx-react-lite';

type Props = {
	size?: number;
	events: ActivityEvent[];
	height?: string | number;
};

export const ActivityChart: FC<Props> = observer(({ size = 15, height = 250, events }) => {
	const data = useMemo(() => {
		console.log('update');

		const end = date.fixed();
		const start = new Date(date.addDays(-size, new Date(end)));
		const chartDays = date.getDates(start, end);

		return chartDays?.map((chartday) => ({
			Date: date.when(chartday, false),
			Events: events.filter((event) => date.match(event.date, chartday)).length,
		}));
	}, [size, events]);

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
					<Legend align='left' verticalAlign='bottom' wrapperStyle={{ left: 60, bottom: 0 }} />

					<CartesianGrid strokeDasharray='3 3' />

					<YAxis
						// domain={[0, 'dataMax']}
						axisLine={false}
						tickLine={false}
						allowDecimals={false}
						interval='preserveStartEnd'
						padding={{ top: 20, bottom: 20 }}
					/>

					<XAxis
						dataKey='Date'
						tickLine={false}
						axisLine={false}
						padding={{ left: 20, right: 20 }}
					/>

					<Line type='monotone' dataKey='Events' stroke='#fff' />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
});
