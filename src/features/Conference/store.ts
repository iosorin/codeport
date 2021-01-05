import Peer from 'simple-peer';
import { makeAutoObservable, reaction } from 'mobx';
import { SocketService } from '@services';

export type PeerItem = {
    peerID: string;
    peer: Peer.Instance;
    constraints: {
        audio: boolean;
        video: boolean;
    };
};

type User = {
    id: string;
    constraints: {
        audio: boolean;
        video: boolean;
    };
};

class ConferenceStore {
    roomID = '';

    socket = SocketService.getInstance();

    stream: MediaStream | undefined = undefined;

    constraints = {
        audio: true,
        video: false,
    };

    streamError: unknown = false;

    peers: PeerItem[] = [];

    limitExceed = false;

    isLoading = false;

    constructor() {
        makeAutoObservable(this, {
            stream: false,

            socket: false,
        });

        reaction(
            () => this.roomID,
            (roomID) => (roomID ? this.joinRoom : this.leaveRoom)()
        );

        this.bindEvents();
    }

    setRoomID = (value: string) => {
        this.roomID = value;
    };

    setStream = (stream: MediaStream | undefined) => {
        this.stream = stream;
    };

    setStreamError = (error: unknown) => {
        this.streamError = error;
    };

    setLoading = (loading = false) => {
        this.isLoading = loading;
    };

    setPeers = (peers: PeerItem[]) => {
        this.peers = peers;
    };

    joinRoom = () => {
        this.setLoading(true);

        this.getStream()
            .then(() => {
                this.socket.emit('join-room', {
                    roomID: this.roomID,
                    constraints: this.constraints,
                });
            })
            .catch(this.setStreamError)
            .finally(this.setLoading);
    };

    leaveRoom = () => {
        this.limitExceed = false;
        this.stream?.getTracks().forEach((track) => track.stop());
    };

    getStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

        stream.getTracks().forEach((track) => {
            Object.keys(this.constraints).forEach((kind) => {
                if (track.kind === kind) {
                    track.enabled = this.constraints[kind as 'audio' | 'video'];
                }
            });
        });

        this.setStream(stream);
    };

    toggleConstraint = (kind: 'audio' | 'video') => {
        this.constraints[kind] = !this.constraints[kind];

        this.stream?.getTracks().find((track) => {
            if (track.kind === kind) {
                track.enabled = this.constraints[kind];
            }
        });

        this.socket.emit('constraints', {
            roomID: this.roomID,
            constraints: this.constraints,
        });
    };

    createPeer = (userToSignal: string, caller: User) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: this.stream,
        });

        peer.on('signal', (signal) => {
            this.socket.emit('sending-signal', {
                userToSignal,
                caller,
                signal,
            });
        });

        return peer;
    };

    addPeer = (caller: User, signal: string) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: this.stream,
        });

        peer.on('signal', (signal) => {
            this.socket.emit('returning-signal', { signal, caller });
        });

        peer.signal(signal);

        return peer;
    };

    bindEvents = () => {
        this.socket.on('client:room-full', () => {
            this.limitExceed = true;
        });

        this.socket.on('client:users-present-in-room', (users: User[]) => {
            this.setPeers(
                users.map((user) => {
                    const peer = this.createPeer(user.id, {
                        id: this.socket.socket!.id,
                        constraints: this.constraints,
                    });

                    return {
                        peer,
                        peerID: user.id,
                        constraints: user.constraints,
                    };
                })
            );
        });

        this.socket.on('client:constraints', (user: User) => {
            this.setPeers(
                this.peers.map((peer) => {
                    if (peer.peerID === user.id) {
                        peer.constraints = user.constraints;
                    }

                    return peer;
                })
            );
        });

        this.socket.on(
            'client:user-joined',
            ({ signal = '', caller }: { signal: string; caller: User }) => {
                const peer = this.addPeer(caller, signal);

                this.setPeers([
                    ...this.peers,
                    { peer, peerID: caller.id, constraints: caller.constraints },
                ]);
            }
        );

        this.socket.on('client:receiving-returned-signal', ({ id = '', signal = '' }) => {
            const peer: PeerItem | undefined = this.peers.find((p) => p.peerID === id);

            peer?.peer.signal(signal);
        });

        this.socket.on('client:user-left', (id = '') => {
            this.setPeers(
                this.peers.filter((peer) => {
                    if (peer.peerID === id) {
                        peer.peer.destroy();

                        return;
                    }

                    return true;
                })
            );
        });
    };
}

export default new ConferenceStore();
