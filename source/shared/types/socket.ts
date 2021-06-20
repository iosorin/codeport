/* eslint-disable @typescript-eslint/no-explicit-any */

type ClientEmit =
	| 'connection'
	| 'check-room'
	| 'join-room'
	| 'disconnect'
	| 'disconnect-user'
	| 'editor-value'
	| 'editor-settings'
	| 'sending-signal'
	| 'returning-signal'
	| 'constraints';

type ServerEmit =
	| 'client:room-full'
	| 'client:room-empty'
	| 'client:users-present-in-room'
	| 'client:user-joined'
	| 'client:user-left'
	| 'client:editor-value'
	| 'client:editor-settings'
	| 'client:receiving-returned-signal'
	| 'client:constraints';

interface SocketWrapInner<T, ON, EMIT> {
	on(event: ON, callback: (e: any) => void): T;
	once(event: ON, callback: (e: any) => void): T;
	emit(event: EMIT, ...args: any): T;
}

export type SocketWrap<T> = T extends SocketIOClient.Emitter
	? SocketWrapInner<T, ServerEmit, ClientEmit>
	: SocketWrapInner<T, ClientEmit, ServerEmit>;
