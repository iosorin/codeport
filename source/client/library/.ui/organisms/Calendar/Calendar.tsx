import React, { FC } from 'react';
import {
	Calendar as ReactCalendar,
	DateRangeType,
	MarkedDay,
} from 'rlc-typescript';

import classNames from 'classnames';
import './calendar.shared.scss';

type Props = {
	displayTime?: boolean;
	startDate?: number;
	dark?: boolean;
	disableDates?: (date: number) => boolean;
	markedDays?: MarkedDay[];
	onChange?: (range: DateRangeType) => void;
	onClickDate?: (date: number) => void;
};

export const Calendar: FC<Props> = ({ dark, ...props }) => {
	return (
		<div
			className={classNames({
				'rlc-dark': dark,
			})}
		>
			<ReactCalendar {...props} />
		</div>
	);
};
