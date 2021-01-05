import React, { FC } from 'react';
import { Select, Input, Dialog } from '@ui';
import { ExtendedEditorConfig, MODES, THEMES } from '../constants';

type Props = {
    settings: ExtendedEditorConfig;
    isOpen: boolean;
    toggleSettings: (show: boolean) => void;
    setSettings: (settings: ExtendedEditorConfig) => void;
};
export const Settings: FC<Props> = ({ settings, isOpen, toggleSettings, setSettings }) => {
    return (
        <Dialog close={() => toggleSettings(false)} isVisible={isOpen} title="Editor Settings">
            <div className="flex-col">
                <Select
                    label="Color Theme:"
                    onChange={(theme: string) => setSettings({ theme })}
                    options={THEMES}
                    value={settings.theme}
                />

                <Select
                    label="Language Mode:"
                    onChange={(mode: string) => setSettings({ mode })}
                    options={MODES}
                    value={settings.mode}
                />

                <Input
                    append="px"
                    label="Font size:"
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
                    label="Tab Width:"
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
            </div>
        </Dialog>
    );
};
