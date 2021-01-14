import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Select, Input, Dialog } from '@ui';
import { MODES, THEMES } from '../constants';
import { IEditorStore } from '../store';

type Props = {
    store: IEditorStore;
};

export const Settings: FC<Props> = observer(({ store }) => {
    return (
        <Dialog
            close={() => store.toggleSettings(false)}
            isVisible={store.settingsIsVisible}
            title="Editor Settings"
        >
            <div className="flex-col">
                <Select
                    label="Color Theme:"
                    onChange={(theme) => store.setSettings({ theme })}
                    options={THEMES}
                    value={store.settings.theme}
                />

                <Select
                    label="Language Mode:"
                    onChange={(language) => store.setSettings({ language })}
                    options={MODES}
                    value={store.settings.language}
                />

                <Input
                    append="px"
                    label="Font size:"
                    max="50"
                    min="12"
                    onChange={(e: { currentTarget: { value: string | number } }) =>
                        store.setSettings({ fontSize: +e.currentTarget.value })
                    }
                    type="number"
                    value={store.settings.fontSize}
                />

                <Input
                    append="px"
                    label="Tab size:"
                    max="10"
                    min="1"
                    onChange={(e: { currentTarget: { value: string | number } }) =>
                        store.setSettings({
                            tabSize: +e.currentTarget.value,
                        })
                    }
                    type="number"
                    value={store.settings.tabSize}
                />
            </div>
        </Dialog>
    );
});
