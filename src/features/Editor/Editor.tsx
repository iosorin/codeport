import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Codemirror from '@uiw/react-codemirror';
import { useHotkey } from '@/library/hooks';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/comment/comment';
import 'codemirror/keymap/sublime';
import { Settings, StatusBar } from './.ui';
import { Compiler } from './features/Compiler';
import store from './store';
import styles from './styles/editor.scss';
import './styles/codemirror.shared.scss';

type Props = {
    roomID: string;
};

export const Editor: FC<Props> = observer(({ roomID }) => {
    useHotkey('ctrl+p', () => store.toggleSettings());
    useHotkey('ctrl+.', () => store.toggleCompiler());

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

            <div className={`${styles.Bar} ${store.compilerIsVisible ? styles.active : ''}`}>
                <Compiler isVisible={store.compilerIsVisible} />

                <StatusBar
                    compilerIsVisible={store.compilerIsVisible}
                    settings={store.settings}
                    toggleCompiler={store.toggleCompiler}
                    toggleSettings={store.toggleSettings}
                />
            </div>

            <Settings
                isOpen={store.settingsIsVisible}
                setSettings={store.setSettings}
                settings={store.settings}
                toggleSettings={store.toggleSettings}
            />
        </div>
    );
});
