import React, { FC, useState } from 'react';
import { Button, Dialog } from '@ui';

import styles from './incoming-call-dialog.scss';

type Props = {
    isShowing: boolean;
    close: () => void;
    accept: () => void;
};

export const IncomingCallDialog: FC<Props> = ({ isShowing, close, accept }) => {
    return (
        <Dialog
            centered
            closeIcon={false}
            close={close}
            isShowing={isShowing}
            persistent
            size="large"
            title="Incoming video call"
            transition="drawer-slide"
        >
            <div className="flex flex-column">
                <div className="my-1" style={{ fontSize: 80 }}>
                    <span aria-label="caller image" role="img">
                        👩‍🚀
                    </span>
                </div>

                <div className="buttons-row flex-center mt-2">
                    <div className="slide-in-elliptic">
                        <Button className={`pulsate ${styles.accept}`} success onClick={accept}>
                            Accept
                        </Button>
                    </div>

                    <Button>Decline</Button>
                </div>
            </div>
        </Dialog>
    );
};
