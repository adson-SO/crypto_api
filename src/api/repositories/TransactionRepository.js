const { Coin, Transaction, sequelize } = require('../models');

class TransactionRepository {
    async updateCoin(valueToUpdateSender, currentCoin, senderAddress, valueToUpdateReceiver, quoteTo, receiverAddress, value, currentCotation, coinId) {
        try {
            const result = await sequelize.transaction(async (t) => {
                await Coin.update({ amount: valueToUpdateSender }, {
                    where: {
                        coin: currentCoin,
                        walletAddress: senderAddress
                    },
                    transaction: t
                });

                await Coin.update({ amount: valueToUpdateReceiver }, {
                    where: {
                        coin: quoteTo,
                        walletAddress: receiverAddress
                    },
                    transaction: t
                });

                const transaction = await Transaction.create({
                    value: value,
                    sendTo: receiverAddress,
                    receiveFrom: senderAddress,
                    currentCotation: currentCotation,
                    coinId: coinId,
                    walletAddress: senderAddress
                },
                {
                    transaction: t
                });

                return transaction;
            });

            return result;
        } catch (err) {
            return err;
        }
    }

    async createCoin(valueToUpdateSender, currentCoin, senderAddress, quoteTo, fullname, amount, receiverAddress, value, currentCotation, coinId) {
        try {
            const result = await sequelize.transaction(async (t) => {
                await Coin.update({ amount: valueToUpdateSender }, {
                    where: {
                        coin: currentCoin,
                        walletAddress: senderAddress
                    },
                    transaction: t
                });

                const coin = await Coin.create({
                    coin: quoteTo,
                    fullname: fullname,
                    amount: amount,
                    walletAddress: receiverAddress
                },
                {
                    transaction: t
                });

                const transaction = await Transaction.create({
                    value: value,
                    sendTo: receiverAddress,
                    receiveFrom: senderAddress,
                    currentCotation: currentCotation,
                    coinId: coinId,
                    walletAddress: senderAddress
                },
                {
                    transaction: t
                });

                return transaction;
            });

            return result;
        } catch (err) {
            return err;
        }
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
}

module.exports = new TransactionRepository();