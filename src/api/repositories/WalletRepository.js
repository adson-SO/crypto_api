const { Wallet, Coin, Transaction } = require('../models');

class WalletRepository {
    async create(name, cpf, birthdate) {
        const result = await Wallet.create({ name, cpf, birthdate });

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

    async findTransactions(filter) {
        const result = await Coin.findAll({
            where: filter,
            attributes: ['coin'],
            include: {
                model: Transaction,
                as: 'transactions',
                attributes: ['value', 'datetime', 'sendTo', 'receiveFrom', 'currentCotation']
            }
        });

        return result;
    }

    async delete(id) {
        await Transaction.destroy({
            where: {
                walletAddress: id
            }
        });

        await Coin.destroy({
            where: {
                walletAddress: id
            }
        });

        await Wallet.destroy({
            where: {
                address: id
            }
        });

        return;
    }

    async findCpf(cpf) {
        const result = await Wallet.findOne({ where: { cpf: cpf } });

        return result;
    }
}

module.exports = new WalletRepository();