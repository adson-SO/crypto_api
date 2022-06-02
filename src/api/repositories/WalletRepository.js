const models = require('../models');

class WalletRepository {
    async create(payload) {
        const result = await models.Wallet.create(payload);
        return result;
    }
}

module.exports = new WalletRepository();