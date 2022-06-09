const WalletRepository = require('../repositories/WalletRepository');
const { cpfValidate, ageValidate, formatCpf, buildQueryFilter } = require('../../helpers');
const InvalidCpf = require('../errors/InvalidCpf');
const DuplicatedCpf = require('../errors/DuplicatedCpf');
const IsNotOver18 = require('../errors/isNotOver18');
const NotFound = require('../errors/NotFound');
class WalletService {
    async create(payload) {
        const { cpf, birthdate } = payload;

        const cpfIsValid = cpfValidate(cpf);
        if(!cpfIsValid) throw new InvalidCpf(cpf);

        const cpfExists = await WalletRepository.findCpf(cpf);
        if(cpfExists) throw new DuplicatedCpf(cpf);

        const isOver18 = ageValidate(birthdate);
        if(!isOver18) throw new IsNotOver18();

        const wallet = await WalletRepository.create(payload);

        const result = formatCpf(wallet);

        return result;
    }

    async findAll(name, cpf, birthdate, createdAt, updatedAt, coin) {
        const filter = buildQueryFilter(name, cpf, birthdate, createdAt, updatedAt, coin);

        const result = await WalletRepository.findAll(filter);

        return result;
    }

    async findOne(id) {
        const result = await WalletRepository.findOne(id);

        if (!result) throw new NotFound();

        return result;
    }

    async findTransactions(id, coinFilter) {
        const filter = coinFilter ? { walletAddress: id, coin: coinFilter } : { walletAddress: id };

        const result = await WalletRepository.findTransactions(filter);

        return result;
    }

    async delete(id) {
        const wallet = await WalletRepository.findOne(id);

        if (!wallet) throw new NotFound();

        await WalletRepository.delete(id);

        return;
    }
}

module.exports = new WalletService();