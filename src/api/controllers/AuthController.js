const authService = require('../services/AuthService')

class AuthController {
    async login(req, res, next) {
        const { email, password } = req.body;

        try {
            const { user, token } = await authService.login(email, password);

            return res.setHeader('Token', token).status(200).json({ user, token });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new AuthController();