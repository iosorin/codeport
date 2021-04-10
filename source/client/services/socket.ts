import socketIOClient from 'socket.io-client';
import { SocketWrap } from 'types';

type Instance = SocketWrap<SocketIOClient.Emitter> & typeof socketIOClient.Socket;

export class SocketService {
    private static socket: Instance;

    public static getInstance = () => {
        if (!SocketService.socket) {
            SocketService.socket = socketIOClient();
        }

        return SocketService.socket;
    };
}
