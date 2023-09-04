export default class ForbiddenError extends Error {
    message: string;
    constructor(message: string) {
      super();
      this.message = message;
    }
  }
  