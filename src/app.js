const express = require('express');
const router = require('./routes');
const errorQualifier = require('./api/middlewares/errorQualifier');

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.errors();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        router(this.server);
    }

    errors() {
        this.server.use(errorQualifier);
    }
}

module.exports = new App().server;