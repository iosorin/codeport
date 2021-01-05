import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BaseLayout } from '@layouts';
import { Editor } from '@/features/Editor';
import { ConferencePanel } from '@/features/Conference';
import styles from './index.scss';
import { useCore } from '@/core';
import { observer } from 'mobx-react-lite';

export const Home: FC = observer(() => {
    const { ui, socket } = useCore();
    const { uuid } = useParams<{ uuid: string }>();

    useEffect(() => {
        ui.toggleConferencePanel(!!uuid);

        if (uuid) {
            socket.emit('check-room', uuid);

            return () => socket.emit('disconnect-user');
        }

        return () => {};
    }, [socket, ui, uuid]);

    return (
        <BaseLayout>
            <div className={styles.container}>
                <div className={styles.editor}>
                    <Editor roomID={uuid} />
                </div>

                <ConferencePanel isVisible={ui.conferencePanelIsVisible} roomID={uuid} />
            </div>
        </BaseLayout>
    );
});
