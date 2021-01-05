import React, { FC, useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';
import { observer } from 'mobx-react-lite';
import { Mic, MicOff, Video, VideoOff } from 'react-feather';
import { Loader, Transition } from '@ui';
import { PeerItem } from '@/features/Conference/store';
import styles from './participant-stream.scss';

type Props = {
    stream?: MediaStream | null | undefined;
    peer?: PeerItem;
    constraints?: { audio: boolean; video: boolean };
    toggleConstraint?: (kind: 'audio' | 'video') => void;
    isCurrentUser?: boolean;
    loading?: boolean;
};

export const ParticipantStream: FC<Props> = observer(
    ({
        stream,
        peer,
        constraints = { audio: false, video: false },
        toggleConstraint = () => {},
        isCurrentUser,
        loading,
    }) => {
        const el = useRef<HTMLVideoElement>(null);

        const [isActive, setIsActive] = useState(false);

        useEffect(() => {
            if (!el.current) return;

            setIsActive(!!stream || !!peer);

            if (stream) {
                el.current.srcObject = stream;
            }

            if (peer) {
                peer.peer.on('stream', (stream) => {
                    el.current!.srcObject = stream;
                });

                return () => peer?.peer.destroy();
            }
        }, [stream, peer]);

        return (
            <div className={`${styles.container} ${isCurrentUser ? '' : styles.guest}`}>
                {/* controls */}
                <div className={styles.controls}>
                    <span
                        className={`${styles.control} ${constraints.audio ? '' : styles.muted}`}
                        onClick={() => toggleConstraint('audio')}
                    >
                        {constraints.audio ? <Mic /> : <MicOff />}
                    </span>

                    <span
                        className={`${styles.control} ${constraints.video ? '' : styles.muted}`}
                        onClick={() => toggleConstraint('video')}
                    >
                        {constraints.video ? <Video /> : <VideoOff />}
                    </span>

                    <span className={`${styles.status} ${isActive ? styles.active : ''}`}></span>
                </div>

                {/* preview */}
                <Transition in={!isActive || loading || !constraints.video} duration="400">
                    <div className={styles.preview}>
                        {!constraints.video ? (
                            <span className="slide-in-blurred-top">👨‍🚀</span>
                        ) : (
                            <Loader />
                        )}
                    </div>
                </Transition>

                {/* muted={isCurrentUser} */}
                <video ref={el} autoPlay muted playsInline />
            </div>
        );
    }
);
