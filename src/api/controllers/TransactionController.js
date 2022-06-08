const TransactionService = require('../services/TransactionService');

class TransactionController {
    async transferFunds(req, res, next) {
        const { id: address } = req.params;
        const { receiverAddress, quoteTo, currentCoin, value } = req.body;

        try {
            await TransactionService.transferFunds(address, receiverAddress, quoteTo, currentCoin, value);

            return res.status(200).json({
                message: 'Transaction succeeded'
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new TransactionController();