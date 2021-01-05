import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Codemirror from '@uiw/react-codemirror';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/comment/comment';
import 'codemirror/keymap/sublime';
import { Settings, StatusBar } from './.ui';
import store from './store';
import styles from './styles/editor.scss';
import './styles/codemirror.shared.scss';

type Props = {
    roomID: string;
};

export const Editor: FC<Props> = observer(({ roomID }) => {
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
        <>
            <div className={styles.Editor} style={{ fontSize: store.settings.fontSize }}>
                <Codemirror onChange={onChange} options={store.settings} value={store.value} />

                <Settings
                    isOpen={store.settingsIsOpen}
                    setSettings={store.setSettings}
                    settings={store.settings}
                    toggleSettings={store.toggleSettings}
                />

                <StatusBar settings={store.settings} toggleSettings={store.toggleSettings} />
            </div>
        </>
    );
});
