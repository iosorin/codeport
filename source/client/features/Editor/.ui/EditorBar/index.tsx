import React, { FC } from 'react';
import classNames from 'classnames';
import { ArrowUpLeft, Settings } from 'react-feather';
import { HOTKEYS } from '@/library/constants';
import { Tooltip } from '@ui';
import styles from './editor-bar.scss';

/* TODO - STORE TYPE */

type Props = {
    store: any;
};

export const EditorBar: FC<Props> = ({ store }) => {
    return (
        <div
            className={classNames(styles.container, {
                [styles.active]: store.visible,
            })}
        >
            <span>{store.settings.mode}</span>
            <span>{store.settings.fontSize}px</span>
            <span>{store.settings.tabSize}px</span>

            <Tooltip content={HOTKEYS.TOGGLE_EDITOR_SETTINGS.label} className={styles.icon} center>
                <Settings size="15" onClick={() => store.toggleSettings(true)} />
            </Tooltip>

            <Tooltip content={HOTKEYS.TOGGLE_EDITOR_CONSOLE.label} className={styles.icon} center>
                <ArrowUpLeft size="16" onClick={() => store.toggleConsole()} className="chevron" />
            </Tooltip>
        </div>
    );
};
