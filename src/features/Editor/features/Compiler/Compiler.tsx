import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Loader, Transition } from '@/library/.ui';
import store from './store';
import styles from './compiler.scss';

type Props = {
    code: string;
    language: string;
    className?: string;
    setEditorValue: (value: string) => void;
};

export const Compiler: FC<Props> = observer(
    ({ code, language, className = '', setEditorValue }) => {
        useEffect(() => {
            const info = store.setLanguageInfo(language);

            if (info?.code) {
                setEditorValue(info?.code);
            }
        }, [language, setEditorValue]);

        return (
            <div className={`${styles.Compiler} ${className}`}>
                <div className={styles.Title}>Compiler</div>

                <div className={styles.Content}>
                    {store.languageInfo.version ? (
                        <>
                            {store.error && <div className={styles.Error}>{store.error}</div>}

                            <div className={styles.Result}>{store.value}</div>
                        </>
                    ) : (
                        <div className={styles.Error}>Language is not supported</div>
                    )}
                </div>

                <div className={styles.Footer}>
                    <div className={styles.Version}>{store.languageInfo.version}</div>

                    <div className={styles.FooterLeft}>
                        <Transition in={store.loading} type="fade">
                            <div className={styles.Loader}>
                                <Loader dur="0.9s" size="20" type="spinner" />
                            </div>
                        </Transition>
                        {/* <span className={styles.Run} onClick={() => store.compile(code, language)}> */}
                        {/* run */}
                        {/* {store.loading ? <Loader dur="0.9s" size="17" type="spinner" /> : 'run'} */}
                        {/* </span> */}
                        <Button onClick={() => store.compile(code, language)} size="small">
                            run
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
);
