const { Wallet, Coin, Transaction, sequelize } = require('../models');

class WalletRepository {
    async create(name, cpf, birthdate) {
        const result = await Wallet.create({ name, cpf, birthdate });

        return result;
    }

    async findAll(walletFilter) {
        const result = await Wallet.findAll({
            where: walletFilter,
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

    async delete(id) {
        try {
            await sequelize.transaction(async (t) => {
                await Transaction.destroy({
                    where: {
                        walletAddress: id
                    },
                    transaction: t
                });
        
                await Coin.destroy({
                    where: {
                        walletAddress: id
                    },
                    transaction: t
                });
        
                await Wallet.destroy({
                    where: {
                        address: id
                    },
                    transaction: t
                });

                return;
            });

            return;
        } catch (err) {
            throw err;
        }
    }

    async findCpf(cpf) {
        const result = await Wallet.findOne({ where: { cpf: cpf } });

        return result;
    }
}

module.exports = new WalletRepository();