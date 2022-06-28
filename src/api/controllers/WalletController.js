const service = require('../services/WalletService');

class WalletController {
    async create(req, res, next) {
        const { name, cpf, birthdate, email, password } = req.body;

        try {
            const { result, token } = await service.create(name, cpf, birthdate, email, password);

            return res.status(201).json({
                user: {
                    address: result.address,
                    name: result.name,
                    cpf: result.cpf,
                    birthdate: result.birthdate,
                    email: result.email,
                    updatedAt: result.updatedAt,
                    createdAt: result.createdAt
                },
                token: token
            });
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
            updatedAt
        } = req.query;

        try {
            const result = await service.findAll(name, cpf, birthdate, createdAt, updatedAt);

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

    async addFunds(req, res, next) {
        const { id } = req.params;
        const { quoteTo: coin, currentCoin, value } = req.body;

        try {
            const transaction = await service.addFunds(id, coin, currentCoin, value);

            const result = {
                value: transaction.value,
                datetime: transaction.datetime,
                sendTo: transaction.sendTo,
                receiveFrom: transaction.receiveFrom,
                currentCotation: transaction.currentCotation
            }

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