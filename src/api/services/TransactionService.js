const walletRepository = require('../repositories/WalletRepository');
const coinRepository = require('../repositories/CoinRepository');
const transactionRepository = require('../repositories/TransactionRepository');
const NotFound = require('../errors/NotFound');
const InvalidField = require('../errors/InvalidField');
const { getCurrencyInfo } = require('../repositories/CurrencyApiRepository');

class TransactionService {
    async transferFunds(senderAddress, receiverAddress, quoteTo, currentCoin, value) {
        const walletExists = await walletRepository.findOne(senderAddress);
        const wallet2Exists = await walletRepository.findOne(receiverAddress);

        if (!walletExists || !wallet2Exists) throw new NotFound();

        const coinExists = await coinRepository.find(currentCoin, senderAddress);
        if (!coinExists) throw new NotFound();

        if (value > coinExists.amount) throw new InvalidField('value');

        const valueToUpdateSender = coinExists.amount - value;

        const { bid: currentCotation, name } = await getCurrencyInfo(currentCoin);

        const quoteToValue = value * currentCotation;
        const fullname = name.slice(name.lastIndexOf('/') + 1);

        const coin2Exists = await coinRepository.find(quoteTo, receiverAddress);
        
        if (coin2Exists) {
            const { amount } = coin2Exists;

            const valueToUpdateReceiver = amount + quoteToValue;

            const result = await transactionRepository.updateCoin(
                valueToUpdateSender, 
                currentCoin, 
                senderAddress, 
                valueToUpdateReceiver, 
                quoteTo, receiverAddress, 
                value, currentCotation, 
                coinExists.id
            );

            return result;
        } else {
            const result = await transactionRepository.createCoin(
                valueToUpdateSender, 
                currentCoin, 
                senderAddress,
                quoteTo,
                fullname,
                quoteToValue,
                receiverAddress,
                value,
                currentCotation,
                coinExists.id
            );

            return result;
        }
    }

    async findTransactions(id, coinFilter) {
        const filter = coinFilter ? { walletAddress: id, coin: coinFilter } : { walletAddress: id };

        const result = await transactionRepository.findTransactions(filter);

        return result;
    }
}

module.exports = new TransactionService();