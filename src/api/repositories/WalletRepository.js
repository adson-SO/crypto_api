const models = require('../models');

class WalletRepository {
    async create(payload) {
        const result = await models.Wallet.create(payload);
        
        return result;
    }

    async findCpf(cpf) {
        const result = await models.Wallet.findOne({ where: { cpf: cpf } });

        return result;
    }
}

module.exports = new WalletRepository();