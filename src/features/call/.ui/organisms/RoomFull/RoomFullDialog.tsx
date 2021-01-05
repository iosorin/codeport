import React, { FC, useState } from 'react';
import { Button, Dialog } from '@ui';

import styles from './room-full-dialog.scss';

type Props = {
    isShowing: boolean;
    close: () => void;
};

export const RoomFullDialog: FC<Props> = ({ isShowing, close }) => {
    return (
        <Dialog
            centered
            closeIcon={false}
            close={close}
            isShowing={isShowing}
            persistent
            size="large"
            title="Oops..."
            transition="drawer-slide"
        >
            <div className="flex flex-column">
                <h3>
                    This room has reached the
                    <br /> maximum number of participants
                </h3>

                <div className="my-1" style={{ fontSize: 80 }}>
                    <span aria-label="caller image" role="img">
                        😬
                    </span>
                </div>

                <div className="buttons-row flex-center mt-2">
                    <div className="slide-in-elliptic">
                        <Button onClick={close}>Got it</Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};
