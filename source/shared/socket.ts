import socketIO from 'socket.io';

enum SocketEmitEvents {
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

enum SocketListenEvents {
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

export interface WrappedSocketService extends socketIO.Socket {
    on(event: keyof typeof SocketListenEvents, fn: (e: any) => void): any;
    once(event: keyof typeof SocketListenEvents, fn: (e: any) => void): any;
    emit(event: keyof typeof SocketEmitEvents, payload?: unknown): boolean;
}
