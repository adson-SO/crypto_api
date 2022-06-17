const transactionController = require('../api/controllers/TransactionController');
const transferFundsValidation = require('../api/validations/transferFunds');
const auth = require('../api/middlewares/auth');

module.exports = (server, router, prefix = '/api/v1/wallet') => {
    router.post('/:id/transaction', auth, transferFundsValidation, transactionController.transferFunds);
    router.get('/:id/transaction', auth, transactionController.findTransactions);
    server.use(prefix, router);
}