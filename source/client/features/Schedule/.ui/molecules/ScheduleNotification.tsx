import React, { FC } from 'react';
import styles from './ScheduleNotification.scss';

type Props = {
    todayLength?: number | null | undefined;
};

export const ScheduleNotification: FC<Props> = ({ todayLength: count }) => {
    const isBusy = count && count > 0 && count <= 3;
    const isTooBusy = count && count > 3;

    const classlist = [styles.container];

    if (isBusy) classlist.push(styles.busy);
    if (isTooBusy) classlist.push(styles.tooBusy);

    return (
        <div className={classlist.join(' ')}>
            <p className="text-left">
                {isBusy || isTooBusy
                    ? `Today you have ${count} scheduled event ${isTooBusy ? '🔥 🔥' : '🤞'}`
                    : "You don't have any events scheduled for today"}
            </p>
        </div>
    );
};
