import React, { FC } from 'react';
import { ArrowUpLeft, Settings } from 'react-feather';
import styles from './status-bar.scss';
import { EditorSettings } from '../../constants';
import { Tooltip } from '@/library/.ui';

type Props = {
    settings: EditorSettings;
    className?: string;
    toggleSettings: (show?: boolean) => void;
    toggleConsole: (show?: boolean) => void;
    consoleIsVisible?: boolean;
};

export const StatusBar: FC<Props> = ({
    settings,
    consoleIsVisible,
    className = '',
    toggleSettings,
    toggleConsole,
}) => {
    return (
        <div
            className={`${styles.container} ${className} ${consoleIsVisible ? styles.active : ''}`}
        >
            <span>{settings.language}</span>
            <span>{settings.fontSize}px</span>
            <span>{settings.tabSize}px</span>

            <Tooltip content="Settings [ctrl+p]" className={styles.icon} center>
                <Settings size="15" onClick={() => toggleSettings(true)} />
            </Tooltip>

            <Tooltip content="Console [ctrl+.]" className={styles.icon} center>
                <ArrowUpLeft size="16" onClick={() => toggleConsole()} className="chevron" />
            </Tooltip>
        </div>
    );
};
