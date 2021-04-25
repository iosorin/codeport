import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { HOTKEYS } from '@/library/constants';
import { useHotkey } from '@/library/hooks';
import { Codemirror } from '@ui';
import { useUi } from '@/core';
import { EditorSettings, EditorBar } from './.ui';
import { Console } from './features/Console';
import store from './store';
import styles from './editor.scss';

type Props = {
    roomID: string;
};

export const Editor: FC<Props> = observer(({ roomID }) => {
    useHotkey(HOTKEYS.EDITOR_TOGGLE_SETTINGS.key, () => store.toggleSettings());
    useHotkey(HOTKEYS.EDITOR_TOGGLE_CONSOLE.key, () => store.toggleConsole(), true, true);

    const { toast } = useUi();

    const showToast = () => {
        toast.log('Lorem, ipsum dolor.');
        toast.error('Lorem ipsum dolor sit amet.');
        toast.success('Snippet was saved');
    };

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
            <button onClick={showToast} type="button">
                SHOW TOAST
            </button>

            <Codemirror
                onChange={onChange}
                onSave={store.saveSnippet}
                options={store.settings}
                value={store.value}
            />

            <EditorSettings
                isOpen={store.settingsVisible}
                setSettings={store.setSettings}
                settings={store.settings}
                toggleSettings={store.toggleSettings}
            />

            <div
                className={classNames(styles.Bar, {
                    [styles.active]: store.consoleVisible,
                })}
            >
                <div
                    className={classNames({
                        hidden: !store.consoleVisible,
                    })}
                >
                    <Console
                        code={store.value}
                        language={store.settings.mode}
                        setEditorValue={store.setValue}
                        toggleConsole={store.toggleConsole}
                    />
                </div>

                <EditorBar store={store} />
            </div>
        </div>
    );
});
