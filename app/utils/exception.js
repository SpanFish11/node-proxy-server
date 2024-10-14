class Exception extends Error {
  constructor (code, message, details = null) {
    super(message)
    this.code = code
    this.details = details
    this.name = this.constructor.name
  }
}

export default Exception
