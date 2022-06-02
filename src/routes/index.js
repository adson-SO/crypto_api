const { Router } = require('express');
const wallet = require('./wallet.router');

module.exports = (server) => {
    wallet(server, new Router());
}