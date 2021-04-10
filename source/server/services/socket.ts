import socketIO from 'socket.io';
import http from 'http';

import { ConferenceUser, SocketWrap } from 'types';

type Instance = SocketWrap<socketIO.Socket> & socketIO.Socket;

type Recorder = {
    createCandidate: (roomId: string) => void;
    saveCandidate: (roomId: string) => void;
};

export class SocketService {
    private io: socketIO.Server;

    private connections: Instance[] = [];

    private users: { [key: string]: ConferenceUser[] } = {};

    private socketToRoom: { [key: string]: string } = {};

    constructor(server: http.Server, public recorder: Recorder) {
        this.io = new socketIO.Server(server);

        this.connection();
    }

    private connection() {
        this.io.on('connection', (socket: Instance) => {
            this.connections.push(socket);

            socket.on('check-room', (roomID: string) => {
                roomFull(roomID);
            });

            socket.on(
                'join-room',
                ({ roomID, constraints }: { roomID: string; constraints: any }) => {
                    if (roomFull(roomID)) {
                        return;
                    }

                    const newUser: ConferenceUser = {
                        id: socket.id,
                        constraints,
                    };

                    if (this.users[roomID]) {
                        this.users[roomID].push(newUser);

                        setTimeout(() => {
                            if (this.users[roomID].length) {
                                this.recorder.createCandidate(roomID);
                            }
                        }, 60000);
                    } else {
                        this.users[roomID] = [newUser];
                    }

                    this.socketToRoom[socket.id] = roomID;

                    const filteredRoomUsers = this.users[roomID].filter(
                        (user) => user.id !== socket.id
                    );

                    socket.emit('client:users-present-in-room', filteredRoomUsers);
                }
            );

            socket.on('sending-signal', (payload) => {
                this.io.to(payload.userToSignal).emit('client:user-joined', payload);
            });

            socket.on('returning-signal', (payload) => {
                this.io.to(payload.caller.id).emit('client:receiving-returned-signal', {
                    signal: payload.signal,
                    id: socket.id,
                });
            });

            socket.on('editor-value', (payload) => {
                share('client:editor-value', payload);
            });

            socket.on('editor-settings', (payload) => {
                share('client:editor-settings', payload);
            });

            socket.on(
                'constraints',
                ({ roomID, constraints }: { roomID: string; constraints: any }) => {
                    if (roomID) {
                        const user = this.users[roomID].find((user) => user.id === socket.id);

                        if (user) {
                            user.constraints = constraints;

                            share('client:constraints', user);
                        }
                    }
                }
            );

            const roomFull = (roomID: string) => {
                if (this.users[roomID]) {
                    if (this.users[roomID].length === 4) {
                        socket.emit('client:room-full');

                        return true;
                    }
                }
            };

            const share = (event: string, payload: any, includeSender = false) => {
                const roomID = this.socketToRoom[socket.id];

                if (this.users[roomID]) {
                    this.users[roomID].forEach((user) => {
                        socket.broadcast.to(user.id).emit(event, payload);
                    });
                }

                if (includeSender) {
                    socket.emit(event, payload);
                }
            };

            const disconnect = () => {
                const roomID = this.socketToRoom[socket.id];

                let room = this.users[roomID];
                let length = 1;

                if (room) {
                    room = room.filter((user) => user.id !== socket.id);
                    length = Object.keys(room).length;

                    this.users[roomID] = room;
                }

                socket.broadcast.emit('client:user-left', socket.id, length);

                if (length <= 1) {
                    socket.broadcast.emit('client:room-empty');
                }

                this.recorder.saveCandidate(roomID);
            };

            socket.on('disconnect-user', disconnect);
            socket.on('disconnect', disconnect);
        });
    }
}
