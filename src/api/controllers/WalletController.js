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

    async findAll(req, res, next) {
        const { 
            name,
            cpf,
            birthdate,
            createdAt,
            updatedAt,
            coin
         } = req.query;

        try {
            const result = await WalletService.findAll(name, cpf, birthdate, createdAt, updatedAt, coin);

            return res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    }

    async findOne(req, res, next) {
        const { id } = req.params;

        try {
            const result = await WalletService.findOne(id);

            return res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    }

    async findTransactions(req, res, next) {
        const { id } = req.params;
        const { coin: coinFilter } = req.query;

        try {
            const result = await WalletService.findTransactions(id, coinFilter);

            return res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            await WalletService.delete(id);

            return res.status(204).end();
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new WalletController();