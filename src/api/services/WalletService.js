const WalletRepository = require('../repositories/WalletRepository');
const { cpfValidate, ageValidate } = require('../../helpers');
const InvalidCpf = require('../errors/InvalidCpf');
const DuplicatedCpf = require('../errors/DuplicatedCpf');
const IsNotOver18 = require('../errors/isNotOver18');

class WalletService {
    async create(payload) {
        const { cpf, birthdate } = payload;

        const cpfIsValid = cpfValidate(cpf);
        if(!cpfIsValid) {
            return new InvalidCpf(cpf);
        }

        const cpfExists = await WalletRepository.findCpf(cpf);
        if(cpfExists) {
            return new DuplicatedCpf(cpf);
        }

        const isOver18 = ageValidate(birthdate);
        if(!isOver18) {
            return new IsNotOver18();
        }

        const result = await WalletRepository.create(payload);

        return result;
    }
}

module.exports = new WalletService();