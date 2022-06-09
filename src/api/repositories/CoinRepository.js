const models = require('../models');

class CoinRepository {
    async findCoin(coin, id) {
        const coinExists = await models.Coin.findOne({ where: { coin: coin, walletAddress: id } });

        return coinExists;
    }

    async updateCoin(valueToUpdate, coin, id, quoteToValue, currentCotation, coinId) {
        await models.Coin.update({ amount: valueToUpdate }, {
            where: {
                coin: coin,
                walletAddress: id
            }
        });

        await models.Transaction.create({
            value: quoteToValue,
            sendTo: id,
            receiveFrom: id,
            currentCotation: currentCotation,
            walletAddress: id,
            coinId: coinId
        });

        return;
    }

    async create(coin, fullname, quoteToValue, id) {
        await models.Coin.create({
            coin: coin,
            fullname: fullname,
            amount: quoteToValue,
            walletAddress: id
        });

        return;
    }
}

module.exports = new CoinRepository();