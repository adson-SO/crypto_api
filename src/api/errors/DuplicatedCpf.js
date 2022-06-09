class DuplicatedCpf extends Error {
    constructor(cpf) {
        super(cpf);
        this.name = 'Duplicated CPF';
        this.description = `The CPF ${cpf} already exists`
    }
}

module.exports = DuplicatedCpf;