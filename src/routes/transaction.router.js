const transactionController = require('../api/controllers/TransactionController');
const transferFundsValidation = require('../api/validations/transferFunds');

module.exports = (server, router, prefix = '/api/v1/wallet') => {
    router.post('/:id/transaction', transferFundsValidation, transactionController.transferFunds);
    router.get('/:id/transaction', transactionController.findTransactions);
    server.use(prefix, router);
}