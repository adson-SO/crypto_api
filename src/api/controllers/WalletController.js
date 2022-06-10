const service = require('../services/WalletService');

class WalletController {
    async create(req, res, next) {
        const { name, cpf, birthdate } = req.body;

        try {
            const result = await service.create(name, cpf, birthdate);

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
            const result = await service.findAll(name, cpf, birthdate, createdAt, updatedAt, coin);

            return res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    }

    async findOne(req, res, next) {
        const { id } = req.params;

        try {
            const result = await service.findOne(id);

            return res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    }

    async findTransactions(req, res, next) {
        const { id } = req.params;
        const { coin: coinFilter } = req.query;

        try {
            const result = await service.findTransactions(id, coinFilter);

            return res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            await service.delete(id);

            return res.status(204).end();
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new WalletController();