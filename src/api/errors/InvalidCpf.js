class InvalidCpf extends Error {
    constructor(cpf) {
        super(cpf);
        this.description = 'cpf';
        this.name = `cpf ${cpf} is not valid`
    }
}

module.exports = InvalidCpf;