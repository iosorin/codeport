import React, { FC } from 'react';
import { BaseLayout } from '@ui/layouts';
import { Schedule } from '@/features/Schedule';

export const ScheduleView: FC = () => (
	<BaseLayout>
		<h1>Schedule</h1>

		<Schedule />
	</BaseLayout>
);
