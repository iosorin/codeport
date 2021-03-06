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
    const handleConfirm = async () => {
        try {
            await confirm();
            close();
        } catch (error) {
            console.log(error);
        }
    };

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
                    <Button onClick={handleConfirm} background="success" loading={loading} zoom>
                        Confirm
                    </Button>

                    <Button onClick={close} className="ml-1" background="light" zoom>
                        Cancel
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};
