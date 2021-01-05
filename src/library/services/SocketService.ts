import io from 'socket.io-client';

export enum Listen {
    'connection',
    'client:room-full',
    'client:users-present-in-room',
    'client:user-joined',
    'client:receiving-returned-signal',
    'client:user-left',
}

export enum Emit {
    'check-room',
    'join-room',
    'sending-signal',
    'returning-signal',
    'disconnect-user',
}

type SocketOrNull = SocketIOClient.Socket | null;

export interface SocketServiceInterface {
    socket: SocketOrNull;
    init(): SocketService;
    on(event: keyof typeof Listen, e?: any): SocketService;
    once(event: keyof typeof Listen, e?: any): SocketService;
    emit(event: keyof typeof Emit, e?: any): SocketService;
    disconnect(): void;
}

export class SocketService implements SocketServiceInterface {
    private static instance: SocketService;

    public socket: SocketOrNull = null;

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
        this.socket = io();

        return this;
    };

    public on = (event: any /* keyof typeof Listen */, e?: any) => {
        this.socket?.on(event, e);

        return this;
    };

    public once = (event: any /* keyof typeof Listen */, e?: any) => {
        this.socket?.once(event, e);

        return this;
    };

    public emit = (event: any /* keyof typeof Emit */, e?: any) => {
        this.socket?.emit(event, e);

        return this;
    };

    public disconnect = (): void => {
        this.socket?.disconnect();
    };
}
