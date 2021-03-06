const bcrypt = require('bcrypt');
const walletRepository = require('../repositories/WalletRepository');
const coinRepository = require('../repositories/CoinRepository');
const { cpfValidate, ageValidate, formatCpf, buildQueryFilter } = require('../../helpers');
const AlreadyExistsError = require('../errors/AlreadyExistsError');
const InvalidField = require('../errors/InvalidField');
const IsNotOver18 = require('../errors/isNotOver18');
const NotFound = require('../errors/NotFound');
const InsufficientMoney = require('../errors/InsufficientMoney');
const { getCurrencyInfo } = require('../repositories/CurrencyApiRepository');
const authService = require('../services/AuthService');
class WalletService {
    async create(name, cpf, birthdate, email, password) {
        const cpfIsValid = cpfValidate(cpf);
        if(!cpfIsValid) throw new InvalidField('cpf');

        const cpfExists = await walletRepository.find({ cpf });
        if(cpfExists) throw new AlreadyExistsError('cpf');

        const isOver18 = ageValidate(birthdate);
        if(!isOver18) throw new IsNotOver18();

        const emailExists = await walletRepository.find({ email });
        if (emailExists) throw new AlreadyExistsError('email');

        const hashPassword = bcrypt.hashSync(password, 10);

        await walletRepository.create(name, cpf, birthdate, email, hashPassword);

        const { user, token } = await authService.login(email, hashPassword);

        const result = formatCpf(user);

        return { result, token };
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

    async delete(id) {
        const wallet = await walletRepository.findOne(id);

        if (!wallet) throw new NotFound();

        await walletRepository.delete(id);

        return;
    }
}

module.exports = new WalletService();