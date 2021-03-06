const IsNotOver18 = require('../errors/isNotOver18');
const NotFound = require('../errors/NotFound');
const InsufficientMoney = require('../errors/InsufficientMoney');
const InvalidField = require('../errors/InvalidField');
const AlreadyExistsError = require('../errors/AlreadyExistsError');

module.exports = async (err, req, res, next) => {
    let status = 500;

    if (err instanceof AlreadyExistsError) status = 400;

    if (err instanceof IsNotOver18) status = 400;

    if (err instanceof NotFound) status = 404;

    if (err instanceof InsufficientMoney) status = 400;

    if (err instanceof InvalidField) status = 400;

    return res.status(status).json(err);
}