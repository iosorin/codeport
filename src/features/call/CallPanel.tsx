import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Peer, { SignalData } from 'simple-peer';
import { useSocket } from '@context';
import { callIsActive } from './reducer';
import {
    DevicesErrorText,
    PanelFooter,
    ParticipantsList,
    RoomFullDialog,
    ParticipantStream,
} from './.ui';
import styles from './call-panel.scss';

type Props = {
    roomID: string | undefined;
};

type PeerItem = {
    peerID: string;
    peer: Peer.Instance;
};

type Users = string[];

export const CallPanel: FC<Props> = ({ roomID }) => {
    const socket = useSocket();
    const history = useHistory();

    const isActive = useSelector(callIsActive);
    const [roomFull, setRoomFull] = useState(false);

    const [userStream, setUserStream] = useState<MediaStream | null>(null);
    const [userStreamError, setUserStreamError] = useState(false);

    const [peers, setPeers] = useState<PeerItem[]>([]);
    const peersRef = useRef<PeerItem[]>([]);

    const createPeer = useCallback(
        (userToSignal: string, callerID: string | undefined, stream: MediaStream) => {
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream,
            });

            peer.on('signal', (signal) => {
                socket.emit('event:sending-signal', {
                    userToSignal,
                    callerID,
                    signal,
                });
            });

            return peer;
        },
        [socket]
    );

    const addPeer = useCallback(
        (callerID: string, signal: string | SignalData, stream: MediaStream) => {
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream,
            });

            peer.on('signal', (signal) => {
                socket.emit('event:returning-signal', { signal, callerID });
            });

            peer.signal(signal);

            return peer;
        },
        [socket]
    );

    // const sendToPeers = (data: unknown) => {
    //     if (peersRef.current.length) {
    //         peersRef.current.forEach((peer) => {
    //             peer.peer.emit('data', JSON.stringify(data));
    //         });
    //     }
    // };

    const join = useCallback(
        (stream: MediaStream) => {
            socket.emit('event:join-room', roomID);

            socket.on('users-present-in-room', (users: Users) => {
                const peers = users.map((userID) => {
                    const peer = createPeer(userID, socket.socket?.id, stream);

                    const peerItem = {
                        peerID: userID,
                        peer,
                    };

                    return peerItem;
                });

                peersRef.current = peers;
                setPeers(peers);
            });

            socket.on('user-joined', ({ signal = '', callerID = '' }) => {
                const peer = addPeer(callerID, signal, stream);

                const peerItem = {
                    peerID: callerID,
                    peer,
                };

                const peers = [...peersRef.current, peerItem];

                peersRef.current = peers;
                setPeers(peers);
            });

            socket.on('receiving-returned-signal', ({ id = '', signal = '' }) => {
                const item: PeerItem | undefined = peersRef.current.find((p) => p.peerID === id);

                if (item) {
                    item.peer.signal(signal);
                }
            });

            socket.on('user-left', (id: string) => {
                const peerItem = peersRef.current.find((p) => p.peerID === id);

                if (peerItem) {
                    peerItem.peer.destroy();
                }

                const peers = peersRef.current.filter((p) => p.peerID !== id);

                peersRef.current = peers;
                setPeers(peers);
            });
        },
        [addPeer, createPeer, roomID, socket]
    );

    useEffect(() => {
        if (roomID) {
            socket.emit('event:check-room', roomID);
            socket.on('room-full', () => setRoomFull(true));

            const constraints = {
                audio: true,
                video: {
                    frameRate: 24,
                    width: {
                        min: 480,
                        ideal: 720,
                        max: 1280,
                    },
                    aspectRatio: 1.7777777778,
                },
            };

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((stream) => {
                    if (!stream || roomFull) return;

                    setUserStream(stream);

                    join(stream);
                })
                .catch(setUserStreamError);
        }

        return () => {
            socket.emit('event:disconnect-user');
        };
    }, [join, roomFull, roomID, socket]);

    const goHome = () => {
        history.push('/');
    };

    const refresh = () => {
        history.go(0);
    };

    return (
        <div className={`${styles.panel} ${isActive ? styles.visible : null}`}>
            <RoomFullDialog close={goHome} isShowing={roomFull} />

            {userStreamError ? (
                <DevicesErrorText />
            ) : (
                <>
                    <ParticipantStream isCurrentUser stream={userStream} />

                    <PanelFooter finish={goHome} length={peers.length + 1} refresh={refresh} />

                    {!roomFull && <ParticipantsList peers={peers} />}
                </>
            )}
        </div>
    );
};
