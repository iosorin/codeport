import React, { FC } from 'react';
import { Button } from '@ui';
import styles from './panel-footer.scss';
import { RefreshCcw } from 'react-feather';

type Props = {
    length: number;
    leave: () => void;
    refresh: () => void;
};

export const PanelFooter: FC<Props> = ({ length, leave, refresh }) => {
    const max = process.env.MAX_PEERS || 4;

    return (
        <div className={styles.footer}>
            <h4>
                Participants: {length}/{max}
            </h4>

            <div className="flex-center">
                <Button size="small" onClick={leave}>
                    Leave
                </Button>
                <RefreshCcw onClick={refresh} size="14" className={styles.refresh} />
            </div>
        </div>
    );
};
