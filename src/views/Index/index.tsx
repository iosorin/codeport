import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BaseLayout } from '@layouts';
import { Editor } from '@/features/Editor';
import { CallPanel, toggleCallPannel } from '@/features/Call';
import styles from './index.scss';

export const Index: FC = () => {
    const dispatch = useDispatch();

    const { uuid } = useParams<{ uuid: string }>();

    useEffect(() => {
        dispatch(toggleCallPannel(!!uuid));
    }, [dispatch, uuid]);

    return (
        <BaseLayout>
            <div className={styles.container}>
                <div className={styles.editor}>
                    <Editor />
                </div>

                <CallPanel roomID={uuid} />
            </div>
        </BaseLayout>
    );
};
