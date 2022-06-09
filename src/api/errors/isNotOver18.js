class IsNotOver18 extends Error {
    constructor() {
        super();
        this.name = 'Invalid Age';
        this.description = 'You must be over 18 years old'
    }
}

module.exports = IsNotOver18;