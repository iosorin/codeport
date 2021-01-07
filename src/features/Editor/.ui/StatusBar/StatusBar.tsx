import React, { FC } from 'react';
import { ChevronDown, ChevronUp, Settings } from 'react-feather';
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

            <Settings size="15" onClick={() => toggleSettings(true)} />
            <ChevronUp size="15" onClick={() => toggleCompiler()} className="chevron" />
        </div>
    );
};
