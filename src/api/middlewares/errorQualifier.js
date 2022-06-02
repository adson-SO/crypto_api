const DuplicatedCpf = require('../errors/DuplicatedCpf');
const InvalidCpf = require('../errors/InvalidCpf');
const IsNotOver18 = require('../errors/isNotOver18');

module.exports = async (err, req, res, next) => {
    let status = 500;

    if(err instanceof InvalidCpf) {
        status = 400;
    }

    if(err instanceof DuplicatedCpf) {
        status = 400;
    }

    if(err instanceof IsNotOver18) {
        status = 400;
    }

    return res.status(status).json(err);
}