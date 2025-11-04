import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { ExceptionFilter } from '../index.js';
import { Logger } from '../../logger/index.js';
import { Component } from '../../../types/index.js';

@injectable()
export class DefaultExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ){
    this.logger.info('Register DefaultExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({error: error.message});
  }
}
