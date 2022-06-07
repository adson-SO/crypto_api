class InsufficientMoney extends Error {
    constructor() {
        super();
        this.name = 'Insufficient Money';
        this.description = 'You do not have enough money in your account to finish the operation';
    }
}

module.exports = InsufficientMoney;