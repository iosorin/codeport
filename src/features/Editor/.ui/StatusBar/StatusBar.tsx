import React, { FC } from 'react';
import { Settings } from 'react-feather';
import styles from './status-bar.scss';
import { ExtendedEditorConfig } from '../../constants';

type Props = {
    settings: ExtendedEditorConfig;
    toggleSettings: (show: boolean) => void;
};

export const StatusBar: FC<Props> = ({ settings, toggleSettings }) => {
    return (
        <div className={styles.container}>
            <span>{settings.mode}</span>
            <span>{settings.fontSize}px</span>
            <span>{settings.tabSize}px</span>

            <Settings size="15" onClick={() => toggleSettings(true)} />
        </div>
    );
};
