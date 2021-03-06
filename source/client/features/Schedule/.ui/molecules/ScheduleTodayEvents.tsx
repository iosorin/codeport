import React, { FC } from 'react';
import styles from './schedule-today-events.scss';

type Props = {
    today: number | null | undefined;
};

export const ScheduleTodayEvents: FC<Props> = ({ today }) => {
    const isBusy = today && today > 0 && today <= 3;
    const isTooBusy = today && today > 3;

    const classlist = [styles.container];

    if (isBusy) classlist.push(styles.busy);
    if (isTooBusy) classlist.push(styles.tooBusy);

    return (
        <div className={classlist.join(' ')}>
            <p className="text-left">
                {isBusy || isTooBusy
                    ? `Today you have ${today} scheduled event ${isTooBusy ? '🔥 🔥' : '🤞'}`
                    : "You don't have any events scheduled for today"}
            </p>
        </div>
    );
};
