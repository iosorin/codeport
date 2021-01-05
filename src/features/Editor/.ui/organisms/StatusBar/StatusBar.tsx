import { getEditorState, toggleEditorSettings } from '@/features/Editor/reducer';
import React from 'react';
import { Settings } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import styles from './status-bar.scss';

export const StatusBar = () => {
    const { settings } = useSelector(getEditorState);
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <span>{settings.mode}</span>
            <span>spaces: {settings.tabSize}</span>

            <Settings size="15" onClick={() => dispatch(toggleEditorSettings(true))} />
        </div>
    );
};
