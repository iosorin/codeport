import React, { FC, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { Mic, MicOff, Video, VideoOff } from 'react-feather';
import { Loader, Transition } from '@ui';
import { PeerItem } from '@/features/Conference/store';
import styles from './participant-stream.scss';

type Props = {
	stream?: MediaStream | null | undefined;
	peer?: PeerItem;
	constraints?: { audio: boolean; video: boolean };
	toggleConstraint?: (kind: 'audio' | 'video') => void;
	currentUser?: boolean;
	owner?: boolean;
	loading?: boolean;
};

export const ParticipantStream: FC<Props> = observer(
	({
		stream,
		peer,
		constraints = { audio: false, video: false },
		toggleConstraint = () => {},
		currentUser,
		loading,
	}) => {
		const el = useRef<HTMLVideoElement>(null);

		const [streamID, setStreamID] = useState('');

		useEffect(() => {
			const set = (stream: MediaStream) => {
				if (!el.current) return;

				el.current.srcObject = stream;

				setStreamID(stream.id);
			};

			if (stream) {
				set(stream);
			}

			if (peer) {
				peer.peer.on('stream', set);

				return () => peer?.peer.destroy();
			}
		}, [stream, peer]);

		return (
			<div
				className={classNames(styles.container, {
					[styles.guest]: !currentUser,
				})}
			>
				{/* controls */}
				<div className={styles.controls}>
					<span
						className={classNames('opacity', styles.control, {
							[styles.muted]: !constraints.audio,
						})}
						onClick={() => stream && toggleConstraint('audio')}
					>
						{constraints.audio ? <Mic /> : <MicOff />}
					</span>

					<span
						className={classNames('opacity', styles.control, {
							[styles.muted]: !constraints.video,
						})}
						onClick={() => stream && toggleConstraint('video')}
					>
						{constraints.video ? <Video /> : <VideoOff />}
					</span>

					<span
						className={classNames(styles.status, {
							[styles.active]: streamID,
						})}
					></span>
				</div>

				{/* preview */}
				<Transition in={!streamID || loading || !constraints.video} duration={400}>
					<div className={styles.preview}>
						{!constraints.video ? <span className='slide-in-blurred-top'>👨‍🚀</span> : <Loader />}
					</div>
				</Transition>

				{/* video ref */}
				<video ref={el} autoPlay muted={currentUser} playsInline />
			</div>
		);
	}
);
