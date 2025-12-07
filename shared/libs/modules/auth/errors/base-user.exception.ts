import { HttpError } from '../../../../libs/rest/index.js';

export class BaseAuthException extends HttpError {
  constructor(httpStatusCode: number, message: string) {
    super(httpStatusCode, message);
  }
}
