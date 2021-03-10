import React, { FC, useState } from 'react';
import ReactLightCalendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css';
import { date } from '@/library/utils';

export const Calendar: FC = () => {
    const onChange = (startDate: number, endDate: number) => console.log(startDate, endDate);

    return (
        <div
            style={{ width: 400, height: 400, backgroundColor: '#272727', borderRadius: 20 }}
            className="mt-3"
        >
            <div className="fill flex-center">
                <ReactLightCalendar onChange={onChange} />
            </div>
        </div>
    );
};
