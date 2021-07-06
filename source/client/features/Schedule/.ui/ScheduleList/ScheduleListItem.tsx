import React, { FC } from 'react';
import { Block, Colors, Event } from '@ui';
import { observer } from 'mobx-react-lite';
import type { ScheduleEvent } from 'types';
import { date } from '@utils';

type Props = {
	details: ScheduleEvent;
	updateEvent: (event: ScheduleEvent) => void;
	toggleDialog: (event: ScheduleEvent) => void;
	toggleConfirmDialog: (event: ScheduleEvent) => void;
};

export const ScheduleListItem: FC<Props> = observer(
	({ details, updateEvent, toggleDialog, toggleConfirmDialog }) => {
		const startsIn = date.diff(details.date);
		const when = date.when(details.date, true, false);

		return (
			<Block
				key={details.id}
				size='large'
				title={details.title}
				background='dark'
				onEdit={() => toggleDialog(details)}
				onRemove={() => toggleConfirmDialog(details)}
				small={startsIn ? <div className='h5 mt-xs text-grey'>Starts in {startsIn}</div> : null}
				icon={<div className='h4 mt-xs'>{when}</div>}
			>
				<Colors
					trigger='line'
					active={details.color}
					onChange={(color) => updateEvent({ ...details, color })}
				/>

				<Event details={details} date={false} showEmpty />
			</Block>
		);
	}
);
