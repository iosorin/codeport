import React from 'react';
import styles from './text.scss';

export const CopyLinkText = () => {
    return (
        <div className={styles.text}>
            <h4 className="text-center text-grey" style={{ marginTop: 70 }}>
                Copy link from <br />
                address bar and share it
            </h4>
        </div>
    );
};
