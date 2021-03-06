import React, { CSSProperties, FC } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'react-feather';
import { useHotkey } from '@hooks';
import { Backdrop, Transition } from '@ui';
import styles from './dialog.scss';

export type Props = {
    visible: boolean;
    title?: string | boolean | JSX.Element | null;
    closeIcon?: boolean;
    persistent?: boolean;
    centered?: boolean;
    size?: 'small' | 'normal' | 'large' | 'fullscreen';
    transition?: Transition;
    dark?: boolean;
    style?: CSSProperties;
    close: () => void;
};

export const Dialog: FC<Props> = ({
    visible,
    children,
    title = null,
    closeIcon = true,
    persistent,
    centered,
    size = 'normal',
    transition = 'zoom',
    dark,
    style = {},
    close,
}) => {
    useHotkey('escape', close, visible);

    const dialog = () => {
        return (
            <>
                <Backdrop
                    visible={visible}
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
                    <Transition duration={450} in={visible} type={transition}>
                        <div
                            style={{ ...style }}
                            className={`${styles.dialog} ${dark ? styles.dark : ''} ${
                                centered ? styles.centered : ''
                            } ${styles[size]}`}
                        >
                            <div className={styles.header}>
                                {typeof title === 'string' ? (
                                    <div className={`h4 ${styles.title}`}>{title}</div>
                                ) : (
                                    title
                                )}

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
