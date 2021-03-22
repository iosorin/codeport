import socketIO from 'socket.io';
import http from 'http';
import { ConferenceUser } from 'types';

type Event = {
    create: (time: number) => Promise<{ id: string | number }>;
    updateTime: (id: string, time: number) => void;
};
export class SocketService {
    private io: socketIO.Server;

    private connections: socketIO.Socket[] = [];

    private users: { [key: string]: ConferenceUser[] } = {};

    private socketToRoom: { [key: string]: string } = {};

    private Event: Event;

    private eventId: string | number = '';

    constructor(server: http.Server, EventModel: Event) {
        this.io = new socketIO.Server(server);

        this.Event = EventModel;

        this.connection();
    }

    private connection() {
        this.io.on('connection', (socket: socketIO.Socket) => {
            this.connections.push(socket);

            socket.on('check-room', (roomID) => {
                roomIsFull(roomID);
            });

            socket.on('join-room', ({ roomID, constraints }) => {
                if (roomIsFull(roomID)) {
                    return;
                }

                const newUser: ConferenceUser = {
                    id: socket.id,
                    constraints,
                };

                if (this.users[roomID]) {
                    this.users[roomID].push(newUser);

                    this.Event.create(Date.now()).then((event) => {
                        console.log('event', event);
                        this.eventId = event.id;
                    });
                } else {
                    this.users[roomID] = [newUser];
                }

                this.socketToRoom[socket.id] = roomID;

                const filteredRoomUsers = this.users[roomID].filter(
                    (user) => user.id !== socket.id
                );

                socket.emit('client:users-present-in-room', filteredRoomUsers);
            });

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

            socket.on('constraints', (payload) => {
                if (payload.roomID) {
                    const user = this.users[payload.roomID].find((user) => user.id === socket.id);

                    if (user) {
                        user.constraints = payload.constraints;

                        share('client:constraints', user);
                    }
                }
            });

            const roomIsFull = (roomID: string) => {
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

                console.log('this.eventId', this.eventId);
                if (this.eventId) {
                    this.Event.updateTime(String(this.eventId), Date.now());
                }
            };

            socket.on('disconnect-user', disconnect);
            socket.on('disconnect', disconnect);
        });
    }
}
