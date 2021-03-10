import React, { FC } from 'react';
import classNames from 'classnames';
import { ArrowUpLeft, Settings } from 'react-feather';
import { HOTKEYS } from '@/library/constants';
import { Tooltip } from '@ui';
import { EditorSettingsType } from '../../constants';
import styles from './editor-bar.scss';

type Props = {
    visible?: boolean;
    settings: EditorSettingsType;
    toggleSettings: (show?: boolean) => void;
    toggleConsole: (show?: boolean) => void;
};

export const EditorBar: FC<Props> = ({ visible, settings, toggleSettings, toggleConsole }) => {
    return (
        <div
            className={classNames(styles.container, {
                [styles.active]: visible,
            })}
        >
            <span>{settings.mode}</span>
            <span>{settings.fontSize}px</span>
            <span>{settings.tabSize}px</span>

            <Tooltip content={HOTKEYS.TOGGLE_EDITOR_SETTINGS.label} className={styles.icon} center>
                <Settings size="15" onClick={() => toggleSettings(true)} />
            </Tooltip>

            <Tooltip content={HOTKEYS.TOGGLE_EDITOR_CONSOLE.label} className={styles.icon} center>
                <ArrowUpLeft size="16" onClick={() => toggleConsole()} className="chevron" />
            </Tooltip>
        </div>
    );
};
