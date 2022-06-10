const WalletRepository = require('../repositories/WalletRepository');
const CoinRepository = require('../repositories/CoinRepository');
const NotFound = require('../errors/NotFound');
const InvalidField = require('../errors/InvalidField');
const { getCurrencyInfo } = require('../repositories/CurrencyApiRepository');

class TransactionService {
    async transferFunds(address, receiverAddress, quoteTo, currentCoin, value) {
        if (value < 0) throw new InvalidField('value');

        const walletExists = await WalletRepository.findOne(address);
        const wallet2Exists = await WalletRepository.findOne(receiverAddress);

        if (!walletExists || !wallet2Exists) throw new NotFound();

        const coinExists = await CoinRepository.findCoin(currentCoin, address);
        if (!coinExists) throw new NotFound();

        if (value > coinExists.amount) throw new InvalidField('value');

        const valueToSubtract = coinExists.amount - value;

        const { bid: currentCotation, name } = await getCurrencyInfo(currentCoin);

        const quoteToValue = value * currentCotation;
        const fullname = name.slice(name.lastIndexOf('/') + 1);

        await CoinRepository.updateCoin(valueToSubtract, currentCoin, address, quoteToValue, currentCotation, coinExists.id);

        const coin2Exists = await CoinRepository.findCoin(quoteTo, receiverAddress);
        
        if (coin2Exists) {
            const { amount, id: coinId } = coin2Exists;

            const valueToUpdate = amount + quoteToValue;

            await CoinRepository.updateCoin(valueToUpdate, quoteTo, receiverAddress, quoteToValue, currentCotation, coinId);

            return;
        } else {
            await CoinRepository.create(quoteTo, fullname, quoteToValue, receiverAddress);

            return;
        }
    }
}

module.exports = new TransactionService();