const InvalidCpf = require('../errors/InvalidCpf');

module.exports = async (err, req, res, next) => {
    let status = 500;

    if(err instanceof InvalidCpf) {
        status = 400;
    }

    return res.status(status).json(err);
}