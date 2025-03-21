import React, { FC } from 'react';
import { SupportedLanguages } from 'defaults';
import { Select, Input, Dialog } from '@ui';
import { EditorSettingsType, THEMES } from '../constants';

type Props = {
    isOpen: boolean;
    settings: EditorSettingsType;
    toggleSettings: (show: boolean) => void;
    setSettings: (settings: EditorSettingsType) => void;
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
                onChange={(theme: string) => setSettings({ theme })}
                options={THEMES}
                value={settings.theme}
            />

            <Select
                label="Language"
                onChange={(mode: string) => setSettings({ mode })}
                options={[...SupportedLanguages]}
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
