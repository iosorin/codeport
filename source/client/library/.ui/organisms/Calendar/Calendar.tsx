import React, { FC } from 'react';
import ReactLightCalendar from '@lls/react-light-calendar';
import classNames from 'classnames';
import './calendar.shared.scss';

type Props = {
    dark?: boolean;
};

export const Calendar: FC<Props> = ({ dark }) => {
    return (
        <div
            className={classNames({
                'rlc-dark': dark,
            })}
        >
            <ReactLightCalendar
                onChange={(e: any) => console.log(e)}
                displayTime={Date.now()}
                startDate={Date.now()}
            />
        </div>
    );
};
