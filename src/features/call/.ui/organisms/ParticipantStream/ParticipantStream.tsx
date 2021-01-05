import React, { FC, useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';
import { Mic, MicOff, Video, VideoOff } from 'react-feather';
import { Loader, Transition } from '@ui';
import styles from './participant-stream.scss';
import { useSocket } from '@/library/context';

type Props = {
    stream?: MediaStream | null;
    peer?: { peerID: string; peer: SimplePeer.Instance };
    isCurrentUser?: boolean;
};

export const ParticipantStream: FC<Props> = ({ stream, peer, isCurrentUser }) => {
    const el = useRef<HTMLVideoElement>(null);

    const socket = useSocket();

    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true);
    const [srcExist, setSrcExist] = useState(false);

    useEffect(() => {
        console.log('useEffect');
        if (!el.current) return;

        if (stream) {
            el.current.srcObject = stream;
        }

        peer?.peer?.on('stream', (stream: MediaStream) => {
            el.current!.srcObject = stream;
        });

        socket.on('track-muted', setMute);

        setSrcExist(!!(stream || peer));

        return () => {
            stream?.getTracks().forEach((track) => track.stop());
            peer?.peer?.destroy();
        };
    }, [stream, peer]);

    /* todo: research add/remove remote channels */
    const setMute = ({ type, value, userID }: any) => {
        // from current user stream or sync remote item
        const sync = !userID || userID === peer?.peerID;

        if (!sync) return;

        if (type === 'audio') {
            setAudio(value);
        }
        if (type === 'video') {
            setVideo(value);
        }
    };

    /* note: it doesn't work correctly - we have to set disabled status after event was emitted from server to itself */
    const sendMute = (type: 'audio' | 'video') => {
        if (!isCurrentUser) return;

        stream?.getTracks().forEach((track) => {
            if (track.kind === type) {
                const value = !track.enabled;

                setMute({ type, value });

                socket.emit('mute-track', { type, value, userID: socket.socket?.id });

                track.enabled = value;
            }
        });
    };

    const showPreview = !srcExist || !video;
    const preview = (
        <Transition in={showPreview} duration="350">
            <div className={styles.preview}>
                {!video ? !video && <span className="slide-in-blurred-top">👨‍🚀</span> : <Loader />}
            </div>
        </Transition>
    );

    const activeStatus = srcExist;
    const controls = (
        <div className={styles.controls}>
            <span
                className={`${styles.control} ${audio ? '' : styles.muted}`}
                onClick={() => sendMute('audio')}
            >
                {audio ? <Mic /> : <MicOff />}
            </span>

            <span
                className={`${styles.control} ${video ? '' : styles.muted}`}
                onClick={() => sendMute('video')}
            >
                {video ? <Video /> : <VideoOff />}
            </span>

            <span className={`${styles.status} ${activeStatus ? styles.active : ''}`}></span>
        </div>
    );

    return (
        <div className={`${styles.container}`}>
            {controls}
            {preview}

            <video ref={el} autoPlay muted playsInline />
        </div>
    );
};
