import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'react-feather';
import { Backdrop, Transition } from '@ui';
import styles from './drawer.scss';

export type Props = {
    visible: boolean;
    title?: string | boolean;
    closeIcon?: boolean;
    persistent?: boolean;
    hide: () => void;
};

export const Drawer: FC<Props> = ({
    visible,
    children,
    title = 'Drawer',
    closeIcon = true,
    persistent,
    hide = () => {},
}) => {
    const drawer = () => {
        return (
            <>
                <Backdrop
                    visible={visible}
                    onClick={() => !persistent && hide()}
                    style={{ zIndex: 10 }}
                />

                <div
                    aria-hidden
                    aria-modal
                    className={styles.wrapper}
                    role="dialog"
                    style={{ zIndex: 10 }}
                    tabIndex={-1}
                >
                    <Transition duration={400} in={visible} type="slide-in-left">
                        <div className={styles.drawer}>
                            <div className={styles.header}>
                                {title ? <h4 className={styles.title}>{title}</h4> : null}

                                {closeIcon ? (
                                    <button
                                        aria-label="Close"
                                        className={styles.close}
                                        data-dismiss="modal"
                                        onClick={hide}
                                        type="button"
                                    >
                                        <X size="19" />
                                    </button>
                                ) : null}
                            </div>

                            <div className={styles.content}>{children}</div>
                        </div>
                    </Transition>
                </div>
            </>
        );
    };

    return createPortal(drawer(), document.body);
};
