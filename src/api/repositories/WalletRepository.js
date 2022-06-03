const models = require('../models');

class WalletRepository {
    async create(payload) {
        const result = await models.Wallet.create(payload);
        
        return result;
    }

    async findAll(filter) {
        const result = await models.Wallet.findAll({
            where: filter,
            include: { 
                model: models.Coin, 
                as: 'coins',
                attributes: ['coin', 'fullname', 'amount'],
                include: {
                    model: models.Transaction,
                    as: 'transactions',
                    attributes: ['value', 'datetime', 'sendTo', 'receiveFrom', 'currentCotation']
                }
            }
        });

        return result;
    }

    async findOne(id) {
        const result = await models.Wallet.findByPk(id, {
            include: {
                model: models.Coin,
                as: 'coins',
                attributes: ['coin', 'fullname', 'amount'],
                include: {
                    model: models.Transaction,
                    as: 'transactions',
                    attributes: ['value', 'datetime', 'sendTo', 'receiveFrom', 'currentCotation']
                }
            }
        });

        return result;
    }

    async findCpf(cpf) {
        const result = await models.Wallet.findOne({ where: { cpf: cpf } });

        return result;
    }
}

module.exports = new WalletRepository();