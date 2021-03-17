import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import mongoose from 'mongoose';
import { ConferenceUser } from 'types';
import * as dotenv from 'dotenv';
import { router } from './router';
import { UserModel } from './models/User';

// @ts-ignore
import paths from '../../config/paths';

dotenv.config();

mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc: any, converted: any) => {
        delete converted.__v;
        delete converted._id;
    },
});

class App {
    private io = {} as socketIO.Server;

    private port: string | number;

    private server: http.Server;

    private connections: socketIO.Socket[] = [];

    private users: { [key: string]: ConferenceUser[] } = {};

    private socketToRoom: { [key: string]: string } = {};

    constructor(port: string | number = 5000) {
        const app = express();

        app.use(express.static(paths.dist));

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        app.use('/api', router);

        this.port = port;

        this.server = new http.Server(app);
    }

    private ioConnection = () => {
        this.io = new socketIO.Server(this.server);

        this.io.on('connection', (socket: socketIO.Socket) => {
            this.connections.push(socket);

            /* todo 1:1 */
            socket.on('check-room', (roomID) => {
                if (this.users[roomID]) {
                    if (this.users[roomID].length === 4) {
                        socket.emit('client:room-full');
                    }
                }
            });

            /* todo 1:1 */
            socket.on('join-room', ({ roomID, constraints }) => {
                const newUser = {
                    id: socket.id,
                    constraints,
                };

                if (this.users[roomID]) {
                    if (this.users[roomID].length === 4) {
                        socket.emit('client:room-full');

                        return;
                    }

                    this.users[roomID].push(newUser);
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
            };

            socket.on('disconnect-user', disconnect);
            socket.on('disconnect', disconnect);
        });
    };

    private createUser = async () => {
        await UserModel.findOne((candidate: any) => {
            if (!candidate) {
                const user = new UserModel({
                    name: 'Irina',
                    email: 'Irina@gmail.com',
                    schedule: [],
                    completed: [],
                });

                return user.save();
            }
        });
    };

    public async bootstrap() {
        try {
            await mongoose.connect(
                'mongodb+srv://osorina:3vgKjowSI78udYTL@codeport-cluster.slwbz.mongodb.net/codeport?retryWrites=true&w=majority',
                {
                    useNewUrlParser: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true,
                }
            );

            await this.createUser();

            // this.ioConnection();

            this.server.listen(this.port);

            console.log(`Server listening on port ${this.port}.`);
        } catch (error) {
            console.error(error);
        }
    }
}

new App(process.env.SERVER_PORT).bootstrap();
