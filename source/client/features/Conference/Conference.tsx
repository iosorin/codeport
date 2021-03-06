import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { ParticipantsList, ParticipantStream, LimitDialog, Footer, DevicesErrorTip } from './.ui';
import store from './store';
import styles from './conference.scss';

type Props = {
    mode?: 'list' | 'grid';
    roomID: string | undefined;
};

export const Conference: FC<Props> = observer(({ roomID = '', mode = 'list' }) => {
    const history = useHistory();

    const goHome = () => history.push('/');
    const refreshPage = () => history.go(0);

    useEffect(() => {
        store.setRoomID(roomID);

        return store.leaveRoom;
    }, [roomID]);

    return (
        <div className={`${styles.panel} ${styles[mode]}`}>
            <LimitDialog close={goHome} visible={store.limitExceed} />

            {store.streamError ? (
                <DevicesErrorTip />
            ) : (
                <>
                    <ParticipantStream
                        constraints={store.constraints}
                        currentUser
                        loading={store.loading}
                        stream={store.stream}
                        toggleConstraint={store.toggleConstraint}
                    />

                    {!store.limitExceed && <ParticipantsList peers={store.peers} />}
                </>
            )}

            <Footer leave={goHome} length={store.peers.length + 1} refresh={refreshPage} />
        </div>
    );
});
