import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Input, Dialog } from '@ui';
import {
    getEditorState,
    setEditorTheme,
    setEditorSettings as set,
    toggleEditorSettings as toggle,
} from '../../reducer';
import { MODES, THEMES } from '../../defaults';

export const EditorSettings: FC = () => {
    const { settings, settingsIsOpen } = useSelector(getEditorState);

    const dispatch = useDispatch();

    return (
        <Dialog
            close={() => dispatch(toggle(false))}
            isShowing={settingsIsOpen}
            title="Editor Settings"
        >
            <div className="flex-col">
                <Select
                    label="Color Theme:"
                    onChange={(theme: string) => dispatch(setEditorTheme(theme))}
                    options={THEMES}
                    value={settings.theme}
                />

                <Select
                    label="Language Mode:"
                    onChange={(mode: string) => dispatch(set({ mode }))}
                    options={MODES}
                    value={settings.mode}
                />

                <Input
                    append="px"
                    label="Tab Width:"
                    max="10"
                    min="1"
                    onChange={(e: { currentTarget: { value: string | number } }) =>
                        dispatch(set({ tabSize: +e.currentTarget.value }))
                    }
                    type="number"
                    value={settings.tabSize}
                />

                <Input
                    append="px"
                    label="Font size:"
                    max="50"
                    min="12"
                    onChange={(e: { currentTarget: { value: string | number } }) =>
                        dispatch(set({ fontSize: +e.currentTarget.value }))
                    }
                    type="number"
                    value={settings.fontSize}
                />
            </div>
        </Dialog>
    );
};
