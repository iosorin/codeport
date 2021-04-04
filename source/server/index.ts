import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
import { router } from './router';
import { SocketService } from './services/socket';
import { EventsRecorder } from './models/EventsRecorder';
import { Activity } from './models/Activity';

// @ts-ignore
import paths from '../../config/paths';

dotenv.config();

class App {
    private server: http.Server;

    private socket: SocketService;

    constructor(public port: string | number = 5000) {
        const app = express();

        app.use(express.static(paths.dist));

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        app.use('/api', router);

        this.server = new http.Server(app);

        this.socket = new SocketService(this.server, new EventsRecorder(Activity.create));
    }

    public start() {
        this.server.listen(this.port);

        // eslint-disable-next-line no-console
        console.log(`Server listening on port ${this.port}.`);
    }
}

new App(process.env.SERVER_PORT).start();
