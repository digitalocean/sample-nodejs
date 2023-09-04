export default class ValidatorError extends Error {
  message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}
