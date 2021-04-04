import React, { FC } from 'react';
import { SUPPORTED_LANGUAGES } from 'defaults';
import { Select, Input, Dialog } from '@ui';
import { EditorOptions, EDITOR_THEMES } from '@/library/constants';

type Props = {
    isOpen: boolean;
    settings: EditorOptions;
    toggleSettings: (show: boolean) => void;
    setSettings: (settings: EditorOptions) => void;
};

export const EditorSettings: FC<Props> = ({ settings, isOpen, toggleSettings, setSettings }) => {
    return (
        <Dialog
            close={() => toggleSettings(false)}
            visible={isOpen}
            title="Editor Settings"
            size="small"
        >
            <Select
                label="Theme"
                onChange={(theme) => setSettings({ theme })}
                options={[...EDITOR_THEMES]}
                value={settings.theme}
            />

            <Select
                label="Language"
                onChange={(mode) => setSettings({ mode })}
                options={[...SUPPORTED_LANGUAGES]}
                value={settings.mode}
            />

            <Input
                append="px"
                label="Font-size"
                max="50"
                min="12"
                onChange={(e: { currentTarget: { value: string | number } }) =>
                    setSettings({ fontSize: +e.currentTarget.value })
                }
                type="number"
                value={settings.fontSize}
            />

            <Input
                append="px"
                label="Spaces"
                max="10"
                min="1"
                onChange={(e: { currentTarget: { value: string | number } }) =>
                    setSettings({
                        tabSize: +e.currentTarget.value,
                        indentUnit: +e.currentTarget.value,
                    })
                }
                type="number"
                value={settings.tabSize}
            />
        </Dialog>
    );
};
