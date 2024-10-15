class Exception extends Error {
  public code: number;
  public details?: unknown;

  constructor(code: number, message: string, details?: unknown) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = this.constructor.name;
  }
}

export default Exception;
