import React from 'react';
import { VideoOff } from 'react-feather';

import styles from './text.scss';
export const DevicesErrorText = () => {
    return (
        <div className={styles.text}>
            <h3 className="mb-2">
                Check your camera, <br /> microphone permissions
            </h3>
            <VideoOff size="25"></VideoOff>
        </div>
    );
};
