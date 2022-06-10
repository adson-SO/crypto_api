const walletController = require('../api/controllers/WalletController');
const transactionController = require('../api/controllers/TransactionController');
const createValidation = require('../api/validations/createWallet');
const addFundsValidation = require('../api/validations/addFunds');
const transferFundsValidation = require('../api/validations/transferFunds');

module.exports = (server, router, prefix = '/api/v1/wallet') => {
    router.post('/', createValidation, walletController.create);
    router.get('/', walletController.findAll);
    router.get('/:id', walletController.findOne);
    router.put('/:id', addFundsValidation, walletController.addFunds);
    router.post('/:id/transaction', transferFundsValidation, transactionController.transferFunds);
    router.get('/:id/transaction', transactionController.findTransactions);
    router.delete('/:id', walletController.delete);
    server.use(prefix, router);
}