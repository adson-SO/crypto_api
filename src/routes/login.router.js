const authController = require('../api/controllers/AuthController');

module.exports = (server, router, prefix = '/api/v1/login') => {
    router.post('/', authController.login);
    server.use(prefix, router);
}