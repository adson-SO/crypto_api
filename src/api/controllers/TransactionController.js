const transactionService = require('../services/TransactionService');

class TransactionController {
    async transferFunds(req, res, next) {
        const { id: senderAddress } = req.params;
        const { receiverAddress, quoteTo, currentCoin, value } = req.body;

        try {
            const transaction = await transactionService.transferFunds(senderAddress, receiverAddress, quoteTo, currentCoin, value);

            const result = {
                value: transaction.value,
                datetime: transaction.datetime,
                sendTo: transaction.sendTo,
                receiveFrom: transaction.receiveFrom,
                currentCotation: transaction.currentCotation
            };

            return res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    }

    async findTransactions(req, res, next) {
        const { id } = req.params;
        const { coin: coinFilter } = req.query;

        try {
            const result = await transactionService.findTransactions(id, coinFilter);

            return res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new TransactionController();