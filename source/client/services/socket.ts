import socketIOClient from 'socket.io-client';
import { SocketWrap } from 'types';

type SocketInstance = SocketWrap<SocketIOClient.Emitter> & typeof socketIOClient.Socket;

export class SocketService {
    private static socket: SocketInstance;

    public static getInstance = () => {
        if (!SocketService.socket) {
            SocketService.socket = socketIOClient();
        }

        return SocketService.socket;
    };
}
