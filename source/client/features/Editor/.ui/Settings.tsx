import React, { FC } from 'react';
import { SupportedLanguages } from 'defaults';
import { Select, Input, Dialog } from '@ui';
import { EditorSettings, THEMES } from '../constants';

type Props = {
    settings: EditorSettings;
    isOpen: boolean;
    toggleSettings: (show: boolean) => void;
    setSettings: (settings: EditorSettings) => void;
};

export const Settings: FC<Props> = ({ settings, isOpen, toggleSettings, setSettings }) => {
    return (
        <Dialog
            close={() => toggleSettings(false)}
            isVisible={isOpen}
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
