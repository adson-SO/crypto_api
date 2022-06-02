const WalletRepository = require('../repositories/WalletRepository');
const cpfValidate = require('../../helpers/cpfValidate');
const InvalidCpf = require('../errors/InvalidCpf');

class WalletService {
    async create(payload) {
        const { cpf } = payload;

        const cpfIsValid = cpfValidate(cpf);

        if(!cpfIsValid) {
            throw new InvalidCpf(cpf);
        }

        const result = await WalletRepository.create(payload);

        return result;
    }
}

module.exports = new WalletService();