import React, { FC, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Mic, MicOff, Video, VideoOff } from 'react-feather';
import { Loader, Transition } from '@ui';
import styles from './video-element.scss';

type Props = {
    source: MediaStream | undefined;
    loading?: boolean;
    isCurrentUser?: boolean;
    constraints?: { audio: boolean; video: boolean };
    toggleConstraint?: (source: 'audio' | 'video') => void;
};

export const VideoElement: FC<Props> = observer(
    ({ source, constraints, loading, toggleConstraint, isCurrentUser }) => {
        const el = useRef<HTMLVideoElement>();

        useEffect(() => {
            if (!el.current || !source) return;

            el.current.srcObject = source;
        }, [source]);

        const showPreview = !source || !constraints?.video || loading;
        const preview = (
            <Transition in={showPreview} duration="450">
                <div className={styles.preview}>
                    {!constraints?.video ? (
                        <span className="slide-in-blurred-top">👨‍🚀</span>
                    ) : (
                        <Loader />
                    )}
                </div>
            </Transition>
        );

        const activeStatus = source;
        const controls = (
            <div className={styles.controls}>
                <span
                    className={`${styles.control} ${constraints?.audio ? '' : styles.muted}`}
                    onClick={() => toggleConstraint?.('audio')}
                >
                    {constraints?.audio ? <Mic /> : <MicOff />}
                </span>

                <span
                    className={`${styles.control} ${constraints?.video ? '' : styles.muted}`}
                    onClick={() => toggleConstraint?.('video')}
                >
                    {constraints?.video ? <Video /> : <VideoOff />}
                </span>

                <span className={`${styles.status} ${activeStatus ? styles.active : ''}`}></span>
            </div>
        );

        return (
            <div className={`${styles.container} ${isCurrentUser ? '' : styles.guest}`}>
                {controls}
                {preview}

                {/* muted={isCurrentUser} */}
                {/* @ts-ignore */}
                <video ref={el} autoPlay muted playsInline />
            </div>
        );
    }
);
