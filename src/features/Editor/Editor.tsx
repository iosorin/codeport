import React, { FC, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import MonacoEditor from 'react-monaco-editor';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useHotkey } from '@/library/hooks';
import { Settings, StatusBar } from './.ui';
import { Console } from './features/Console';
import store from './store';
import styles from './styles/editor.scss';
import './styles/ide.shared.scss';

type Props = {
    roomID: string;
    resizeContainer?: boolean;
};

export const Editor: FC<Props> = observer(({ roomID, resizeContainer }) => {
    const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
    useHotkey('ctrl+p', () => store.toggleSettings());
    useHotkey('ctrl+.', () => store.toggleConsole(), true, true);

    useEffect(() => {
        store.setRoomID(roomID);
    }, [roomID]);

    useEffect(() => {
        if (!editor.current) return;

        console.log('editor.current.layout');
        editor.current.layout();
        editor.current.layout({
            width: resizeContainer ? 'auto' : '100%',
            height: '100%',
        });
    }, [resizeContainer]);

    const editorDidMountHandler = (instance: monaco.editor.IStandaloneCodeEditor) => {
        editor.current = instance;

        store.setSettings({ theme: store.settings.theme });
    };

    return (
        <div className={styles.Editor}>
            <MonacoEditor
                editorDidMount={editorDidMountHandler}
                height="100%"
                language={store.settings.language}
                onChange={(value) => store.setValue(value, true)}
                options={{
                    lineDecorationsWidth: 0,
                    codeLens: false,
                    padding: { top: 15 },
                    formatOnPaste: false,
                    folding: false,
                    lightbulb: { enabled: false },
                    multiCursorModifier: 'ctrlCmd',
                    automaticLayout: false,
                    fontSize: store.settings.fontSize,
                    renderWhitespace: 'none',
                    scrollBeyondLastLine: false,
                    cursorBlinking: 'solid',
                    cursorWidth: 2,
                    // disableLayerHinting: true,
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
