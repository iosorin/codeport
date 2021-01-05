import io from 'socket.io-client';

// todo: share events types across server and client repos
enum Emit {
    'connection',
    'check-room',
    'join-room',
    'disconnect',
    'disconnect-user',
    'editor-value',
    'editor-settings',
    'sending-signal',
    'returning-signal',
    'constraints',
}

enum Listen {
    'client:room-full',
    'client:room-empty',
    'client:users-present-in-room',
    'client:user-joined',
    'client:user-left',
    'client:editor-value',
    'client:editor-settings',
    'client:receiving-returned-signal',
    'client:constraints',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (e: any) => void;
type Sk = SocketIOClient.Socket | null;

export interface SocketServiceInterface {
    socket: Sk;
    init(): SocketService;
    on(event: keyof typeof Listen, fn: Fn): SocketService;
    once(event: keyof typeof Listen, fn: Fn): SocketService;
    emit(event: keyof typeof Emit, payload?: unknown): SocketService;
    disconnect(): void;
}

export class SocketService implements SocketServiceInterface {
    private static instance: SocketService;

    public socket: Sk = null;

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

    public on = (event: keyof typeof Listen, fn: Fn) => {
        this.socket?.on(event, fn);

        return this;
    };

    public once = (event: keyof typeof Listen, fn: Fn) => {
        this.socket?.once(event, fn);

        return this;
    };

    public emit = (event: keyof typeof Emit, payload?: unknown) => {
        this.socket?.emit(event, payload);

        return this;
    };

    public disconnect = (): void => {
        this.socket?.disconnect();
    };
}
