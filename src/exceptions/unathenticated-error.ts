export default class UnAuthenticatedError extends Error {
  message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}
