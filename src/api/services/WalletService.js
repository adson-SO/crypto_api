const walletRepository = require('../repositories/WalletRepository');
const coinRepository = require('../repositories/CoinRepository');
const { cpfValidate, ageValidate, formatCpf, buildQueryFilter } = require('../../helpers');
const InvalidCpf = require('../errors/InvalidCpf');
const DuplicatedCpf = require('../errors/DuplicatedCpf');
const IsNotOver18 = require('../errors/isNotOver18');
const NotFound = require('../errors/NotFound');
const InsufficientMoney = require('../errors/InsufficientMoney');
const { getCurrencyInfo } = require('../repositories/CurrencyApiRepository');
class WalletService {
    async create(name, cpf, birthdate) {
        const cpfIsValid = cpfValidate(cpf);
        if(!cpfIsValid) throw new InvalidCpf(cpf);

        const cpfExists = await walletRepository.findCpf(cpf);
        if(cpfExists) throw new DuplicatedCpf(cpf);

        const isOver18 = ageValidate(birthdate);
        if(!isOver18) throw new IsNotOver18();

        const wallet = await walletRepository.create(name, cpf, birthdate);

        const result = formatCpf(wallet);

        return result;
    }

    async findAll(name, cpf, birthdate, createdAt, updatedAt) {
        const walletFilter = buildQueryFilter(name, cpf, birthdate, createdAt, updatedAt);

        const result = await walletRepository.findAll(walletFilter);

        return result;
    }

    async findOne(id) {
        const wallet = await walletRepository.findOne(id);

        if (!wallet) throw new NotFound();

        const result = formatCpf(wallet);

        return result;
    }

    async addFunds(id, coin, currentCoin, value) {
        const walletExists = await walletRepository.findOne(id);
        if (!walletExists) throw new NotFound();

        const { bid: currentCotation, name } = await getCurrencyInfo(currentCoin);

        const fullname = name.slice(name.lastIndexOf('/') + 1);

        const quoteToValue = Math.abs(value) * currentCotation;

        const coinExists = await coinRepository.find(coin, id);

        if (coinExists) {
            const { amount, id: coinId } = coinExists;

            const valueToUpdate = value >= 0 ? amount + quoteToValue : amount - quoteToValue;

            if (valueToUpdate < 0) throw new InsufficientMoney();

            const result = await coinRepository.update(valueToUpdate, coin, id, quoteToValue, currentCotation, coinId);

            return result;
        } else {
            const result = await coinRepository.create(coin, fullname, quoteToValue, id, currentCotation);

            return result;
        }
    }

    async findTransactions(id, coinFilter) {
        const filter = coinFilter ? { walletAddress: id, coin: coinFilter } : { walletAddress: id };

        const result = await walletRepository.findTransactions(filter);

        return result;
    }

    async delete(id) {
        const wallet = await walletRepository.findOne(id);

        if (!wallet) throw new NotFound();

        await walletRepository.delete(id);

        return;
    }
}

module.exports = new WalletService();