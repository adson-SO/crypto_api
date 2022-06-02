const WalletRepository = require('../repositories/WalletRepository');
const cpfValidate = require('../../helpers/cpfValidate');
const InvalidCpf = require('../errors/InvalidCpf');

class WalletService {
    async create(payload) {
        const cpfIsValid = cpfValidate(payload.cpf);

        if(cpfIsValid === false) {
            throw new InvalidCpf(payload.cpf);
        }

        const result = await WalletRepository.create(payload);
        return result;
    }
}

module.exports = new WalletService();