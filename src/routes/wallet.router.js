const walletController = require('../api/controllers/WalletController');
const createValidation = require('../api/validations/createWallet');
const addFundsValidation = require('../api/validations/addFunds');

module.exports = (server, router, prefix = '/api/v1/wallet') => {
    router.post('/', createValidation, walletController.create);
    router.get('/', walletController.findAll);
    router.get('/:id', walletController.findOne);
    router.put('/:id', addFundsValidation, walletController.addFunds);
    router.delete('/:id', walletController.delete);
    server.use(prefix, router);
}