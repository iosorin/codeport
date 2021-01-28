import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'react-feather';
import { useHotkey } from '@hooks';
import { Backdrop, Transition } from '@ui';

import styles from './dialog.scss';

export type Props = {
    isVisible: boolean;
    title?: string | boolean;
    closeIcon?: boolean;
    persistent?: boolean;
    centered?: boolean;
    size?: 'small' | 'normal' | 'large' | 'fullscreen';
    transition?: Transition;
    close: () => void;
};

export const Dialog: FC<Props> = ({
    isVisible,
    children,
    title,
    closeIcon = true,
    persistent,
    centered,
    size = 'normal',
    transition = 'zoom',
    close,
}) => {
    useHotkey('escape', close, isVisible);

    const dialog = () => {
        return (
            <>
                <Backdrop
                    isVisible={isVisible}
                    onClick={() => !persistent && close()}
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
                    <Transition duration={450} in={isVisible} type={transition}>
                        <div
                            className={`${styles.dialog} ${centered ? styles.centered : ''} ${
                                styles[size]
                            }`}
                        >
                            <div className={styles.header}>
                                {title ? <h4 className={styles.title}>{title}</h4> : null}

                                {closeIcon ? (
                                    <button
                                        aria-label="Close"
                                        className={styles.close}
                                        data-dismiss="modal"
                                        onClick={close}
                                        type="button"
                                    >
                                        <X size="18" />
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

    return createPortal(dialog(), document.body);
};
