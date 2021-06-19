import React, { FC } from 'react';
import { BaseLayout } from '@ui/layouts';
import { Activity } from '@/features/Activity';

export const ActivityView: FC = () => (
	<BaseLayout>
		<h1>Activity</h1>

		<Activity />
	</BaseLayout>
);
