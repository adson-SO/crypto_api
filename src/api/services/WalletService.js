const WalletRepository = require('../repositories/WalletRepository');
const { cpfValidate, ageValidate, formatCpf } = require('../../helpers');
const InvalidCpf = require('../errors/InvalidCpf');
const DuplicatedCpf = require('../errors/DuplicatedCpf');
const IsNotOver18 = require('../errors/isNotOver18');

class WalletService {
    async create(payload) {
        const { cpf, birthdate } = payload;

        const cpfIsValid = cpfValidate(cpf);
        if(!cpfIsValid) {
            throw new InvalidCpf(cpf);
        }

        const cpfExists = await WalletRepository.findCpf(cpf);
        if(cpfExists) {
            throw new DuplicatedCpf(cpf);
        }

        const isOver18 = ageValidate(birthdate);
        if(!isOver18) {
            throw new IsNotOver18();
        }

        const wallet = await WalletRepository.create(payload);

        const result = formatCpf(wallet);

        return result;
    }
}

module.exports = new WalletService();