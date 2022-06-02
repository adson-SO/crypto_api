const WalletService = require('../services/WalletService');

class WalletController {
    async create(req, res, next) {
        const payload = req.body;
        try {
            const result = await WalletService.create(payload);

            return res.status(201).json(result);
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new WalletController();