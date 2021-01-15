import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@ui';
import store from './store';
import styles from './console.scss';
import { IFrame } from './IFrame';
import { X } from 'react-feather';

type Props = {
    code: string;
    language: string;
    className?: string;
    setEditorValue: (value: string) => void;
    toggleConsole: (show: boolean) => void;
};

export const Console: FC<Props> = observer(
    ({ code, language, className = '', setEditorValue, toggleConsole }) => {
        useEffect(() => {
            const info = store.setLanguageInfo(language);

            if (info?.code) {
                setEditorValue(info?.code);
            }
        }, [language, setEditorValue]);

        return (
            <div className={`${styles.Console} ${className}`}>
                <div className="flex flex-between">
                    <div className={styles.Title}>Console</div>

                    <div className="hoverable" onClick={() => store.setResults([])}>
                        clear
                    </div>
                    <X className="hoverable" onClick={() => toggleConsole(false)} size="16" />
                </div>

                <div className={styles.Content}>
                    {store.languageIsSupported ? (
                        <>
                            {store.isJS && (
                                <IFrame
                                    className={styles.Iframe}
                                    onError={(err) => store.addResult(err, true)}
                                    onResult={store.addResult}
                                    script={store.script}
                                    scriptCache={store.scriptCache}
                                    title="editor-frame"
                                />
                            )}

                            {store.results.length
                                ? store.results.map((res, i) => {
                                      return (
                                          <div
                                              // eslint-disable-next-line react/no-array-index-key
                                              key={i}
                                              className={res.error ? styles.Error : styles.Result}
                                          >
                                              {res.value}
                                          </div>
                                      );
                                  })
                                : null}
                        </>
                    ) : (
                        <div className={styles.Error}>Language is not supported</div>
                    )}
                </div>

                <div className="flex flex-between mb-xs">
                    <div className={styles.Version}>{store.languageInfo.version}</div>

                    <Button
                        hover
                        loading={store.loading}
                        onClick={() => store.execute(code, language)}
                        size="small"
                    >
                        run
                    </Button>
                </div>
            </div>
        );
    }
);
