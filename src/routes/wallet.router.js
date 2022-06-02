const WalletController = require('../api/controllers/WalletController');
const createValidation = require('../api/validations/wallet/create');
const errorQualifier = require('../api/middlewares/errorQualifier');

module.exports = (server, router, prefix = '/api/v1/wallet') => {
    router.post('/', createValidation, WalletController.create, errorQualifier);
    server.use(prefix, router);
}