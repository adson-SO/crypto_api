class NotFound extends Error {
    constructor(){
        super();
        this.name = 'Not Found';
        this.description = 'Resource not found';
    }
}

module.exports = NotFound;