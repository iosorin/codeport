import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Codemirror from '@uiw/react-codemirror';
import { HOTKEYS } from '@/library/constants';
import { useHotkey } from '@/library/hooks';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/comment/comment';
import 'codemirror/keymap/sublime';
import { EditorSettings, EditorBar } from './.ui';
import { Console } from './features/Console';
import store from './store';
import styles from './editor.scss';

type Props = {
    roomID: string;
};

export const Editor: FC<Props> = observer(({ roomID }) => {
    useHotkey('ctrl+s', (e) => e.preventDefault());
    useHotkey(HOTKEYS.TOGGLE_EDITOR_SETTINGS.key, () => store.toggleSettings());
    useHotkey(HOTKEYS.TOGGLE_EDITOR_CONSOLE.key, () => store.toggleConsole(), true, true);

    useEffect(() => {
        store.setRoomID(roomID);
    }, [roomID]);

    const onChange = (editor: CodeMirror.Editor, change: any) => {
        const newValue = editor.getValue();
        const isKeydownEvent = /input|undo|redo|paste|delete|drag|compose|cut/.test(change?.origin);

        if (isKeydownEvent) {
            store.setValue(newValue, true);
        }
    };

    return (
        <div className={styles.Editor} style={{ fontSize: store.settings.fontSize }}>
            <Codemirror onChange={onChange} options={store.settings} value={store.value} />

            <EditorSettings
                isOpen={store.settingsVisible}
                setSettings={store.setSettings}
                settings={store.settings}
                toggleSettings={store.toggleSettings}
            />

            <div className={`${styles.Bar} ${store.consoleVisible ? styles.active : ''}`}>
                <div className={store.consoleVisible ? '' : 'hidden'}>
                    <Console
                        code={store.value}
                        language={store.settings.mode}
                        setEditorValue={store.setValue}
                        toggleConsole={store.toggleConsole}
                    />
                </div>

                <EditorBar
                    settings={store.settings}
                    toggleConsole={store.toggleConsole}
                    toggleSettings={store.toggleSettings}
                    visible={store.consoleVisible}
                />
            </div>
        </div>
    );
});
