class InvalidField extends Error {
    constructor(field) {
        super();
        this.name = 'Invalid Field';
        this.description = `The field ${field} is invalid`;
    }
}

module.exports = InvalidField;