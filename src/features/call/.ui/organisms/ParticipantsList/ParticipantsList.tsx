import React, { FC } from 'react';
import SimplePeer from 'simple-peer';
import { CopyLinkText, ParticipantStream } from '../..';
import styles from './participants-list.scss';

type Props = {
    peers: {
        peerID: string;
        peer: SimplePeer.Instance;
    }[];
};

export const ParticipantsList: FC<Props> = ({ peers = [] }) => {
    return (
        <>
            {peers.length ? (
                <div className={styles.list}>
                    {peers.map((peer) => (
                        <ParticipantStream key={peer.peerID} peer={peer} />
                    ))}
                </div>
            ) : (
                <CopyLinkText />
            )}
        </>
    );
};
