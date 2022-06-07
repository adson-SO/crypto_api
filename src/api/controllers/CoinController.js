const CoinService = require('../services/CoinService');

class CoinController {
    async addFunds(req, res, next) {
        const { id } = req.params;
        const { quoteTo: coin, currentCoin, value } = req.body;

        try {
            await CoinService.addFunds(id, coin, currentCoin, value);

            return res.status(200).json({
                message: 'Operation Succeeded'
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new CoinController();