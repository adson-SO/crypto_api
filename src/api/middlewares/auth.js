const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.AUTH_SECRET, (err) => {
            if (err) return res.status(401).json(err);

            return;
        });

        return next();
    }

    return res.status(401).json({
        name: 'Unauthorized',
        description: 'You are not authorized to access this resource'
    });
}