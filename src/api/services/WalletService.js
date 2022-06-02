const WalletRepository = require('../repositories/WalletRepository');
const cpfValidate = require('../../helpers/cpfValidate');
const InvalidCpf = require('../errors/InvalidCpf');
const DuplicatedCpf = require('../errors/DuplicatedCpf');

class WalletService {
    async create(payload) {
        const { cpf } = payload;
        const cpfIsValid = cpfValidate(cpf);

        if(!cpfIsValid) {
            return new InvalidCpf(cpf);
        }

        const cpfExists = await WalletRepository.findCpf(cpf);

        if(cpfExists) {
            return new DuplicatedCpf(cpf);
        }

        const result = await WalletRepository.create(payload);

        return result;
    }
}

module.exports = new WalletService();