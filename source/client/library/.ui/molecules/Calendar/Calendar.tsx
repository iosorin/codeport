import React from 'react';
import ReactLightCalendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css';
import './calendar.shared.scss';

const Calendar = () => {
    return (
        <div>
            <ReactLightCalendar onChange={console.log} />
        </div>
    );
};

export default Calendar;
