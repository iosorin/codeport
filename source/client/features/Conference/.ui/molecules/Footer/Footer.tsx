import React, { FC } from 'react';
import { RefreshCcw } from 'react-feather';
import { Button } from '@ui';
import styles from './footer.scss';

type Props = {
    length: number;
    leave: () => void;
    refresh: () => void;
};

export const Footer: FC<Props> = ({ length, leave, refresh }) => {
    const max = process.env.MAX_PEERS || 4;

    return (
        <div className={styles.footer}>
            <div className={`h4 flex-auto ${styles.participants}`}>
                Participants: {length}/{max}
            </div>

            <div className="flex-end">
                <Button size="small" onClick={leave} hover>
                    Leave
                </Button>

                <RefreshCcw onClick={refresh} size="14" className={styles.refresh} />
            </div>
        </div>
    );
};
