class InvalidCpf extends Error {
    constructor(cpf) {
        super(cpf);
        this.description = 'CPF';
        this.name = `The CPF ${cpf} is not valid`
    }
}

module.exports = InvalidCpf;