import { StatusCodes } from 'http-status-codes';
import { BaseAuthException } from './index.js';

export class UserPasswordIncorrectException extends BaseAuthException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect user name or password');
  }
}
