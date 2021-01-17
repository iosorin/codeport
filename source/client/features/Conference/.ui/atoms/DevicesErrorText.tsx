import React, { FC } from 'react';
import { Slash } from 'react-feather';
import styles from './text.scss';

export const DevicesErrorText: FC = () => {
    return (
        <div className={styles.text}>
            <Slash />

            <h4 className="my-2">
                Check your camera <br />
                and microphone{' '}
                <a
                    href="https://support.google.com/chrome/answer/2693767?co=GENIE.Platform%3DDesktop&hl=en"
                    target="_blank"
                >
                    permissions
                </a>
            </h4>
        </div>
    );
};
