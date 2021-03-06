import React from 'react';
import styles from './text.scss';

export const CopyLinkTip = () => {
    return (
        <div className={styles.text}>
            <h5 className="text-center text-grey" style={{ marginTop: 70 }}>
                Copy link from <br />
                address bar and share it
            </h5>
        </div>
    );
};
