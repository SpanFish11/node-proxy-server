class Exception extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
        this.name = this.constructor.name;
    }
}

export default Exception;