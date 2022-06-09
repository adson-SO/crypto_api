const { Wallet, Coin, Transaction } = require('../models');

class WalletRepository {
    async create(payload) {
        const result = await Wallet.create(payload);

        return result;
    }

    async findAll(filter) {
        const result = await Wallet.findAll({
            where: filter,
            include: {
                model: Coin,
                as: 'coins',
                attributes: ['coin', 'fullname', 'amount'],
                include: {
                    model: Transaction,
                    as: 'transactions',
                    attributes: ['value', 'datetime', 'sendTo', 'receiveFrom', 'currentCotation']
                }
            }
        });

        return result;
    }

    async findOne(id) {
        const result = await Wallet.findByPk(id, {
            include: {
                model: Coin,
                as: 'coins',
                attributes: ['coin', 'fullname', 'amount'],
                include: {
                    model: Transaction,
                    as: 'transactions',
                    attributes: ['value', 'datetime', 'sendTo', 'receiveFrom', 'currentCotation']
                }
            }
        });

        return result;
    }

    async findTransactions(id) {
        const result = await Coin.findAll({
            where: {
                walletAddress: id
            },
            attributes: ['coin'],
            include: {
                model: Transaction,
                as: 'transactions',
                attributes: ['value', 'datetime', 'sendTo', 'receiveFrom', 'currentCotation']
            }
        });

        return result;
    }

    async findCpf(cpf) {
        const result = await Wallet.findOne({ where: { cpf: cpf } });

        return result;
    }
}

module.exports = new WalletRepository();