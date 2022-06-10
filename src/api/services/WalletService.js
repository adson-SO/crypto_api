const repository = require('../repositories/WalletRepository');
const { cpfValidate, ageValidate, formatCpf, buildQueryFilter } = require('../../helpers');
const InvalidCpf = require('../errors/InvalidCpf');
const DuplicatedCpf = require('../errors/DuplicatedCpf');
const IsNotOver18 = require('../errors/isNotOver18');
const NotFound = require('../errors/NotFound');
class WalletService {
    async create(name, cpf, birthdate) {
        const cpfIsValid = cpfValidate(cpf);
        if(!cpfIsValid) throw new InvalidCpf(cpf);

        const cpfExists = await repository.findCpf(cpf);
        if(cpfExists) throw new DuplicatedCpf(cpf);

        const isOver18 = ageValidate(birthdate);
        if(!isOver18) throw new IsNotOver18();

        const wallet = await repository.create(name, cpf, birthdate);

        const result = formatCpf(wallet);

        return result;
    }

    async findAll(name, cpf, birthdate, createdAt, updatedAt) {
        const walletFilter = buildQueryFilter(name, cpf, birthdate, createdAt, updatedAt);

        const result = await repository.findAll(walletFilter);

        return result;
    }

    async findOne(id) {
        const wallet = await repository.findOne(id);

        if (!wallet) throw new NotFound();

        const result = formatCpf(wallet);

        return result;
    }

    async findTransactions(id, coinFilter) {
        const filter = coinFilter ? { walletAddress: id, coin: coinFilter } : { walletAddress: id };

        const result = await repository.findTransactions(filter);

        return result;
    }

    async delete(id) {
        const wallet = await repository.findOne(id);

        if (!wallet) throw new NotFound();

        await repository.delete(id);

        return;
    }
}

module.exports = new WalletService();