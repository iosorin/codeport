import socketIOClient from 'socket.io-client';
import type { SocketWrap } from 'types';

type SocketInstance = SocketWrap<SocketIOClient.Emitter> &
	typeof socketIOClient.Socket;

export class SocketStore {
	private static socket: SocketInstance;

	public static getInstance = () => {
		if (!SocketStore.socket) {
			SocketStore.socket = socketIOClient();
		}

		return SocketStore.socket;
	};
}
