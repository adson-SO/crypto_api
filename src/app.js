const express = require('express');
const router = require('./routes');
const errorHandler = require('./api/middlewares/errorHandler');

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
        this.server.use(errorHandler);
    }
}

module.exports = new App().server;