const WalletController = require('../api/controllers/WalletController');
const createValidation = require('../api/validations/wallet/create');

module.exports = (server, router, prefix = '/api/v1/wallet') => {
    router.post('/', createValidation, WalletController.create);
    server.use(prefix, router);
}