import React, { FC } from 'react';
import { Info } from 'react-feather';
import { Tooltip } from '@ui';
import styles from './text.scss';

type Props = {
    error: unknown;
};

export const DevicesErrorText: FC<Props> = ({ error }) => {
    const errorMesage = JSON.stringify(error);
    // Check your camera and microphone permissions

    return (
        <div className={styles.text}>
            <h3 className="mb-2">
                Ooops... <br />
                Something went wrong
            </h3>

            <Tooltip content={errorMesage} error>
                <Info />
            </Tooltip>
        </div>
    );
};
