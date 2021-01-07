import React, { FC } from 'react';
import { ArrowUpLeft, Settings } from 'react-feather';
import styles from './status-bar.scss';
import { ExtendedEditorConfig } from '../../constants';
import { Tooltip } from '@/library/.ui';

type Props = {
    settings: ExtendedEditorConfig;
    className?: string;
    toggleSettings: (show?: boolean) => void;
    toggleCompiler: (show?: boolean) => void;
    compilerIsVisible?: boolean;
};

export const StatusBar: FC<Props> = ({
    settings,
    compilerIsVisible,
    className = '',
    toggleSettings,
    toggleCompiler,
}) => {
    return (
        <div
            className={`${styles.container} ${className} ${compilerIsVisible ? styles.active : ''}`}
        >
            <span>{settings.mode}</span>
            <span>{settings.fontSize}px</span>
            <span>{settings.tabSize}px</span>

            <Tooltip content="settings [ctrl+p]" className={styles.icon} center>
                <Settings size="15" onClick={() => toggleSettings(true)} />
            </Tooltip>

            <Tooltip content="compiler [ctrl+.]" className={styles.icon} center>
                <ArrowUpLeft size="16" onClick={() => toggleCompiler()} className="chevron" />
            </Tooltip>
        </div>
    );
};
