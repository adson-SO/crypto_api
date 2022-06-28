class AlreadyExistsError extends Error {
    constructor(field) {
        super();
        this.name = 'Resource Already Exists';
        this.description = `Value of field ${field} already exists`;
    }
}

module.exports = AlreadyExistsError;