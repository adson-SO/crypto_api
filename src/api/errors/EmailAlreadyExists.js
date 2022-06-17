class EmailAlreadyExists extends Error {
    constructor(email) {
        super();
        this.name = 'Email Already Exists';
        this.description = `The email ${email} already exists in the database`;
    }
}

module.exports = EmailAlreadyExists;