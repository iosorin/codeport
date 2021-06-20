import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { PeerItem } from '@/features/Conference/store';
import { CopyLinkTip, ParticipantStream } from '../..';
import styles from './participants-list.scss';

type Props = {
	peers: PeerItem[];
};

export const ParticipantsList: FC<Props> = observer(({ peers = [] }) => {
	return (
		<>
			{peers.length ? (
				<div className={styles.list}>
					{peers.map((peer) => (
						<ParticipantStream
							key={peer.peerID}
							peer={peer}
							constraints={peer.constraints}
						/>
					))}
				</div>
			) : (
				<CopyLinkTip />
			)}
		</>
	);
});
