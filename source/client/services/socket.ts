import socketIOClient from 'socket.io-client';
import { SocketEmitEvents, SocketListenEvents } from 'types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (e: any) => void;
type SocketClientOrNull = SocketIOClient.Socket | null;

export interface WrappedSocketService {
    socketClient: SocketClientOrNull;
    init(): SocketService;
    on(event: keyof typeof SocketListenEvents, fn: Fn): SocketService;
    once(event: keyof typeof SocketListenEvents, fn: Fn): SocketService;
    emit(event: keyof typeof SocketEmitEvents, payload?: unknown): SocketService;
    disconnect(): void;
}

export class SocketService implements WrappedSocketService {
    private static instance: SocketService;

    public socketClient: SocketClientOrNull = null;

    constructor() {
        if (SocketService.instance) {
            throw new Error(
                'Error: Instantiation failed: Use SocketService.getInstance() instead of new.'
            );
        }

        SocketService.instance = this;

        this.init();
    }

    public static getInstance = (): SocketService => {
        return SocketService.instance || new SocketService();
    };

    public init = () => {
        this.socketClient = socketIOClient();

        return this;
    };

    public on = (event: keyof typeof SocketListenEvents, fn: Fn) => {
        this.socketClient?.on(event, fn);

        return this;
    };

    public once = (event: keyof typeof SocketListenEvents, fn: Fn) => {
        this.socketClient?.once(event, fn);

        return this;
    };

    public emit = (event: keyof typeof SocketEmitEvents, payload?: unknown) => {
        this.socketClient?.emit(event, payload);

        return this;
    };

    public disconnect = (): void => {
        this.socketClient?.disconnect();
    };
}
