const WalletController = require('../api/controllers/WalletController');
const CoinController = require('../api/controllers/CoinController');
const createValidation = require('../api/validations/wallet/create');
const addFundsValidation = require('../api/validations/coin/addFunds');

module.exports = (server, router, prefix = '/api/v1/wallet') => {
    router.post('/', createValidation, WalletController.create);
    router.get('/', WalletController.findAll);
    router.get('/:id', WalletController.findOne);
    router.put('/:id', addFundsValidation, CoinController.addFunds);
    server.use(prefix, router);
}