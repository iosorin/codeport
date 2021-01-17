import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import {
    Footer,
    DevicesErrorText,
    ParticipantsList,
    ParticipantStream,
    ConferenceLimitDialog,
} from './.ui';
import store from './store';
import styles from './conference.scss';

type Props = {
    mode?: 'list' | 'grid';
    roomID: string | undefined;
};

export const Conference: FC<Props> = observer(({ roomID = '', mode = 'list' }) => {
    const history = useHistory();

    useEffect(() => {
        store.setRoomID(roomID);

        return store.leaveRoom;
    }, [roomID]);

    const goHome = () => {
        history.push('/');
    };

    const refresh = () => {
        history.go(0);
    };

    return (
        <div className={`${styles.panel} ${styles[mode]}`}>
            <ConferenceLimitDialog close={goHome} isVisible={store.limitExceed} />

            {store.streamError ? (
                <DevicesErrorText />
            ) : (
                <>
                    <ParticipantStream
                        constraints={store.constraints}
                        isCurrentUser
                        loading={store.isLoading}
                        stream={store.stream}
                        toggleConstraint={store.toggleConstraint}
                    />

                    {!store.limitExceed && <ParticipantsList peers={store.peers} />}
                </>
            )}

            <Footer leave={goHome} length={store.peers.length + 1} refresh={refresh} />
        </div>
    );
});
