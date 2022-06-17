const { Router } = require('express');
const wallet = require('./wallet.router');
const transaction = require('./transaction.router');
const login = require('./login.router');

module.exports = (server) => {
    wallet(server, new Router());
    transaction(server, new Router());
    login(server, new Router());
}