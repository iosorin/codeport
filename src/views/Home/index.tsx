import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BaseLayout } from '@layouts';
import { Editor } from '@/features/Editor';
import { ConferencePanel } from '@/features/Conference';
import styles from './index.scss';
import { useCore } from '@/core';
import { observer } from 'mobx-react-lite';

export const Home: FC = observer((props) => {
    const history = useHistory();
    const { uuid } = useParams<{ uuid: string }>();
    const { ui, socket } = useCore();

    useEffect(() => {
        ui.toggleConferencePanel(!!uuid);

        if (uuid) {
            socket.emit('check-room', uuid);

            const leaveRoom = () => {
                ui.toggleConferencePanel();
                socket.emit('disconnect-user');
            };

            history.listen(() => {
                if (!props) leaveRoom();
            });

            return leaveRoom;
        }

        return () => {};
    }, [socket, ui, uuid, history, props]);

    return (
        <BaseLayout>
            <div className={styles.container}>
                <div
                    className={`${styles.conference} ${
                        ui.conferencePanelIsVisible ? styles.visible : ''
                    }`}
                >
                    <ConferencePanel roomID={uuid} />
                </div>
                <div className={styles.editor}>
                    <Editor resizeContainer={ui.conferencePanelIsVisible} roomID={uuid} />
                </div>
            </div>
        </BaseLayout>
    );
});
