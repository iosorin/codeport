import React, { FC, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import MonacoEditor from 'react-monaco-editor';
import { useHotkey } from '@/library/hooks';
import { Settings, StatusBar } from './.ui';
import { Console } from './features/Console';
import store from './store';
import styles from './styles/editor.scss';
import './styles/ide.shared.scss';

type Props = {
    roomID: string;
};

export const Editor: FC<Props> = observer(({ roomID }) => {
    useHotkey('ctrl+p', () => store.toggleSettings());
    useHotkey('ctrl+.', () => store.toggleConsole(), true, true);

    useEffect(() => {
        store.setRoomID(roomID);
    }, [roomID]);

    return (
        <div className={styles.Editor}>
            <MonacoEditor
                editorDidMount={() => store.setSettings({ theme: store.settings.theme })}
                height="100%"
                language={store.settings.language}
                onChange={(value) => store.setValue(value, true)}
                options={{
                    automaticLayout: true,
                    fontSize: store.settings.fontSize,
                    scrollbar: {
                        useShadows: false,
                        horizontal: 'hidden',
                        vertical: 'auto',
                        verticalScrollbarSize: 3,
                    },
                    wordWrap: 'on',
                    minimap: { enabled: false },
                }}
                theme={store.settings.theme}
                value={store.value}
                width="100%"
            />

            <Settings store={store} />

            <div className={`${styles.Bar} ${store.consoleIsVisible ? styles.active : ''}`}>
                <Console
                    className={store.consoleIsVisible ? '' : 'hidden'}
                    code={store.value}
                    language={store.settings.mode}
                    setEditorValue={store.setValue}
                    toggleConsole={store.toggleConsole}
                />

                <StatusBar
                    consoleIsVisible={store.consoleIsVisible}
                    settings={store.settings}
                    toggleConsole={store.toggleConsole}
                    toggleSettings={store.toggleSettings}
                />
            </div>
        </div>
    );
});
