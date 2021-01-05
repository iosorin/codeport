const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

require('dotenv').config();

let connections = [];

const users = {};
const socketToRoom = {};

io.on('connection', (socket) => {
    connections.push(socket);

    /* todo 1:1 */
    socket.on('check-room', (roomID) => {
        console.log('check-room', users[roomID] && users[roomID].length);
        if (users[roomID]) {
            if (users[roomID].length === 4) {
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

        if (users[roomID]) {
            if (users[roomID].length === 4) {
                socket.emit('client:room-full');

                return;
            }

            users[roomID].push(newUser);
        } else {
            users[roomID] = [newUser];
        }

        socketToRoom[socket.id] = roomID;

        const filteredRoomUsers = users[roomID].filter((user) => user.id !== socket.id);

        socket.emit('client:users-present-in-room', filteredRoomUsers);
    });

    socket.on('sending-signal', (payload) => {
        io.to(payload.userToSignal).emit('client:user-joined', payload);
    });

    socket.on('returning-signal', (payload) => {
        io.to(payload.caller.id).emit('client:receiving-returned-signal', {
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
            const user = users[payload.roomID].find((user) => user.id === socket.id);

            if (user) {
                user.constraints = payload.constraints;

                share('client:constraints', user);
            }
        }
    });

    socket.on('disconnect-user', disconnect);
    socket.on('disconnect', disconnect);

    function share(event, payload, includeSender) {
        const roomID = socketToRoom[socket.id];

        if (users[roomID]) {
            users[roomID].forEach((user) => {
                socket.broadcast.to(user.id).emit(event, payload);
            });
        }

        if (includeSender) {
            socket.emit(event, payload);
        }
    }

    function disconnect() {
        const roomID = socketToRoom[socket.id];

        let room = users[roomID];
        let length = 1;

        if (room) {
            room = room.filter((user) => user.id !== socket.id);
            users[roomID] = room;
            length = Object.keys(room).length;
        }

        socket.broadcast.emit('client:user-left', socket.id, length);

        if (length <= 1) {
            socket.broadcast.emit('client:room-empty');
        }

        console.log('disconnect', length);
    }
});

server.listen(process.env.SOCKET_PORT, () =>
    console.log(`server is running on port: ${process.env.SOCKET_PORT}`)
);
