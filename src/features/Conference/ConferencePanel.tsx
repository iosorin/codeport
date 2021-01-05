import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';

import {
    PanelFooter,
    DevicesErrorText,
    ParticipantsList,
    ParticipantStream,
    ConferenceLimitDialog,
} from './.ui';

import store from './store';

import styles from './conference-panel.scss';

type Props = {
    roomID: string | undefined;
    isVisible: boolean;
};

export const ConferencePanel: FC<Props> = observer(({ roomID = '', isVisible }) => {
    const history = useHistory();

    useEffect(() => {
        store.setRoomID(roomID);
    }, [roomID]);

    const goHome = () => {
        history.push('/');
    };

    const refresh = () => {
        history.go(0);
    };

    return (
        <div className={`${styles.panel} ${isVisible ? styles.visible : null}`}>
            <ConferenceLimitDialog close={goHome} isVisible={store.limitExceed} />

            {store.streamError ? (
                <DevicesErrorText error={store.streamError} />
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

                    <PanelFooter leave={goHome} length={store.peers.length + 1} refresh={refresh} />
                </>
            )}
        </div>
    );
});
