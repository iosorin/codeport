import React, { FC, useState } from 'react';
import { Button, Dialog } from '@ui';

import styles from './incoming-call-dialog.scss';

type Props = {
    isVisible: boolean;
    close: () => void;
    accept: () => void;
};

export const IncomingCallDialog: FC<Props> = ({ isVisible, close, accept }) => {
    return (
        <Dialog
            centered
            closeIcon={false}
            close={close}
            isVisible={isVisible}
            persistent
            size="large"
            title="Incoming video call"
            transition="slide-in-left"
        >
            <div className="flex flex-column">
                <div className="my-1" style={{ fontSize: 80 }}>
                    <span aria-label="caller image" role="img">
                        👩‍🚀
                    </span>
                </div>

                <div className="list flex-center mt-2">
                    <div className="slide-in-elliptic">
                        <Button
                            className="pulsate"
                            style={{ animationDelay: '1.6s' }}
                            success
                            onClick={accept}
                        >
                            Accept
                        </Button>
                    </div>

                    <Button>Decline</Button>
                </div>
            </div>
        </Dialog>
    );
};
