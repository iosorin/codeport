import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { Footer, DevicesErrorTip, ParticipantsList, ParticipantStream, LimitDialog } from './.ui';
import store from './store';
import styles from './conference.scss';

type Props = {
    mode?: 'list' | 'grid';
    roomID: string | undefined;
};

export const Conference: FC<Props> = observer(({ roomID = '', mode = 'list' }) => {
    const history = useHistory();

    const home = () => history.push('/');
    const refresh = () => history.go(0);

    useEffect(() => {
        store.setRoomID(roomID);

        return store.leaveRoom;
    }, [roomID]);

    return (
        <div className={`${styles.panel} ${styles[mode]}`}>
            <LimitDialog close={home} isVisible={store.limitExceed} />

            {store.streamError ? (
                <DevicesErrorTip />
            ) : (
                <>
                    <ParticipantStream
                        constraints={store.constraints}
                        isCurrentUser
                        loading={store.loading}
                        stream={store.stream}
                        toggleConstraint={store.toggleConstraint}
                    />

                    {!store.limitExceed && <ParticipantsList peers={store.peers} />}
                </>
            )}

            <Footer leave={home} length={store.peers.length + 1} refresh={refresh} />
        </div>
    );
});
