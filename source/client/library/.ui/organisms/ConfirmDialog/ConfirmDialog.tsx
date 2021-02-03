import React, { FC } from 'react';
import { Button, Dialog } from '@ui';

type Props = {
    isVisible: boolean;
    title?: string;
    confirm: () => void;
    close: () => void;
    loading?: boolean;
};

export const ConfirmDialog: FC<Props> = ({
    isVisible,
    confirm,
    close,
    title,
    loading,
    children,
}) => {
    return (
        <Dialog
            centered
            closeIcon={false}
            close={close}
            isVisible={isVisible}
            title={title}
            size="large"
        >
            <div className="flex-col">
                {children}

                <div className="list flex-center mt-2">
                    <Button onClick={confirm} background="success" loading={loading}>
                        Confirm
                    </Button>

                    <Button onClick={close} className="ml-1" background="light">
                        Cancel
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};
