const jwt = require('jsonwebtoken');
const walletRepository = require('../repositories/WalletRepository');
const NotFound = require('../errors/NotFound');
require('dotenv').config();

class AuthService {
    async login(email, password) {
        const user = await walletRepository.find({ email, password });

        if (!user) throw new NotFound();

        const token = jwt.sign({ email, password }, process.env.AUTH_SECRET, {
            expiresIn: '24h'
        });

        return { user, token };
    }
}

module.exports = new AuthService();