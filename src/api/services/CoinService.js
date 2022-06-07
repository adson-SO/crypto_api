const CoinRepository = require('../repositories/CoinRepository');
const WalletRepository = require('../repositories/WalletRepository');
const NotFound = require('../errors/NotFound');
const InsufficientMoney = require('../errors/InsufficientMoney');
const { getCurrencyInfo } = require('../repositories/CoinApiRepository');

class CoinService {
    async addFunds(id, coin, currentCoin, value) {
        const walletExists = await WalletRepository.findOne(id);
        if (!walletExists) throw new NotFound();

        const { bid: currentCotation, name } = await getCurrencyInfo(currentCoin);

        const fullname = name.slice(name.lastIndexOf('/') + 1);

        const quoteToValue = Math.abs(value) * currentCotation;

        const coinExists = await CoinRepository.findCoin(coin, id);

        if (coinExists) {
            const { amount, id: coinId } = coinExists;

            const valueToUpdate = value >= 0 ? amount + quoteToValue : amount - quoteToValue;

            if (valueToUpdate < 0) throw new InsufficientMoney();

            await CoinRepository.updateCoin(valueToUpdate, coin, id, quoteToValue, currentCotation, coinId);

            return;
        } else {
            await CoinRepository.create(coin, fullname, quoteToValue, id);

            return;
        }
    }
}

module.exports = new CoinService();