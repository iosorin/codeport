import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Dialog } from '@ui';

type Props = {
    isVisible: boolean;
    close: () => void;
};

export const ConferenceLimitDialog: FC<Props> = ({ isVisible, close }) => {
    return (
        <Dialog
            centered
            closeIcon={false}
            close={close}
            isVisible={isVisible}
            persistent
            size="large"
            title="Oops..."
            transition="slide-in-left"
        >
            <div className="flex flex-column">
                <h3>
                    This meeting room has reached <br />
                    the maximum number of participants
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
