const { Coin, Transaction, sequelize } = require('../models');
class CoinRepository {
    async find(coin, id) {
        const coinExists = await Coin.findOne({ where: { coin: coin, walletAddress: id } });

        return coinExists;
    }

    async update(valueToUpdate, coin, id, quoteToValue, currentCotation, coinId) {
        try {
            const result = await sequelize.transaction(async (t) => {
                await Coin.update({ amount: valueToUpdate }, {
                    where: {
                        coin: coin,
                        walletAddress: id
                    },
                    transaction: t
                });
        
                const transaction = await Transaction.create({
                    value: quoteToValue,
                    sendTo: id,
                    receiveFrom: id,
                    currentCotation: currentCotation,
                    walletAddress: id,
                    coinId: coinId
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

    async create(coinName, fullname, quoteToValue, id, currentCotation) {
        try {
            const result = await sequelize.transaction(async (t) => {
                const coin = await Coin.create({
                    coin: coinName,
                    fullname: fullname,
                    amount: quoteToValue,
                    walletAddress: id
                },
                {
                    transaction: t
                });

                const transaction = await Transaction.create({
                    value: quoteToValue,
                    sendTo: id,
                    receiveFrom: id,
                    currentCotation: currentCotation,
                    walletAddress: id,
                    coinId: coin.id
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
}

module.exports = new CoinRepository();