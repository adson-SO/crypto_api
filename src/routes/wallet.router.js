const walletController = require('../api/controllers/WalletController');
const createValidation = require('../api/validations/createWallet');
const addFundsValidation = require('../api/validations/addFunds');
const auth = require('../api/middlewares/auth');

module.exports = (server, router, prefix = '/api/v1/wallet') => {
    router.post('/', createValidation, walletController.create);
    router.get('/', auth, walletController.findAll);
    router.get('/:id', auth, walletController.findOne);
    router.put('/:id', auth, addFundsValidation, walletController.addFunds);
    router.delete('/:id', auth, walletController.delete);
    server.use(prefix, router);
}