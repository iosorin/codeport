import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory, useParams } from 'react-router-dom';
import { BaseLayout } from '@ui/layouts';
import { Editor } from '@/features/Editor';
import { Conference } from '@/features/Conference';
import { useCore } from '@/core';
import styles from './home.scss';

export const HomeView: FC = observer((props) => {
    const history = useHistory();
    const { uuid } = useParams<{ uuid: string }>();
    const { ui, socket } = useCore();

    useEffect(() => {
        ui.toggleConferencePanel(Boolean(uuid));

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
        <BaseLayout wide>
            <div className={styles.container}>
                <div className={styles.editor}>
                    <Editor roomID={uuid} />
                </div>

                <div
                    className={`${styles.conference} ${
                        ui.conferencePanelVisible ? styles.visible : ''
                    }`}
                >
                    <Conference roomID={uuid} />
                </div>
            </div>
        </BaseLayout>
    );
});
