import React, { FC, useEffect, useState } from 'react';
import Peer, { SignalData } from 'simple-peer';
import { useSelector } from 'react-redux';
import { callIsActive } from './reducer';
import { IncomingCallDialog, VideoElement } from './.ui';
import { useSocket } from '@/library/socket/SocketProvider';
import { Button } from '@/library/.ui';
import styles from './call-panel.scss';

type Caller = any;
type PeerData = any;
type SocketUsers = any;

export const CallPanel: FC = () => {
    const socket = useSocket();

    const isActive = useSelector(callIsActive);
    const [loading, setLoading] = useState(true);

    const [userID, setUserID] = useState<string>();
    const [participants, setParticipants] = useState<SocketUsers>({});

    const [userStream, setUserStream] = useState<MediaStream | null>(null);
    const [partnerStream, setPartnerStream] = useState<MediaStream | null>(null);

    const [receivingCall, setReceivingCall] = useState(false);
    const [callAccepted, setCallAccepted] = useState(false);

    const [caller, setCaller] = useState<Caller>({ id: '', meta: null });

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
            setUserStream(stream);
            setLoading(false);
        });

        socket.on('user-id', (id: string) => {
            setUserID(id);
        });

        socket.on('users-present-in-room', (users: SocketUsers) => {
            console.log('users', users);
            setParticipants(users);
        });

        socket.on('caller-joined', ({ from, meta }: PeerData) => {
            setReceivingCall(true);

            setCaller({ id: from, meta });
        });
    }, [socket]);

    const callPeer = (id: string) => {
        if (!userStream) return;

        const peer = new Peer({
            initiator: true,
            stream: userStream,
            trickle: false,
        });

        peer.on('signal', (meta) => {
            if (!userID) return;

            const payload: PeerData = { to: id, from: userID, meta };

            socket.emit('event:call-to-user', payload);
        });

        console.log('setPartnerStream');
        peer.on('stream', setPartnerStream);

        socket.on('call-accepted', (meta: SignalData) => {
            setCallAccepted(true);

            peer.signal(meta);
        });
    };

    function acceptCall() {
        if (!userStream) return;

        setCallAccepted(true);

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: userStream,
        });

        peer.on('signal', (meta) => {
            socket.emit('event:accept-call', { meta, to: caller.id });
        });

        peer.on('stream', setPartnerStream);

        if (caller.meta) {
            peer.signal(caller.meta);
        }

        setReceivingCall(false);
    }

    const buttons = Object.keys(participants).map((id) => {
        return (
            id !== userID && (
                <Button
                    key={id}
                    className="mt-auto"
                    label={`Call ${id}`}
                    onClick={() => callPeer(id)}
                />
            )
        );
    });

    return (
        <div className={`${styles.panel} ${isActive ? styles.visible : null}`}>
            <VideoElement isCurrentUser srcObject={userStream} />
            {callAccepted && partnerStream ? <VideoElement srcObject={partnerStream} /> : null}

            {buttons}

            <IncomingCallDialog
                accept={() => acceptCall()}
                close={() => setReceivingCall(false)}
                isShowing={receivingCall}
            />
        </div>
    );
};
