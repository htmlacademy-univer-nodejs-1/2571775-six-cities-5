import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpError, ValidateDtoMiddleware, ValidateObjectIdMiddleware, DocumentExistsMiddleware } from '../../rest/index.js';
import { Logger } from '../../logger/logger.interface.js';
import { Component, HttpMethod } from '../../../types/index.js';
import { CommentDto, CommentService } from './index.js';
import { fillDTO } from '../../helpers/index.js';
import { StatusCodes } from 'http-status-codes';
import { CreateCommentRequest } from './requests/create-comment-request.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
        @inject(Component.Logger) protected readonly logger: Logger,
        @inject(Component.CommentService) private readonly commentService: CommentService,
  ){
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/:commentId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [new ValidateObjectIdMiddleware('commentId'), new ValidateDtoMiddleware(CommentDto), new DocumentExistsMiddleware(commentService, 'comment', 'commentId')]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CommentDto)]
    });
  }

  public async create(
    { body }: CreateCommentRequest,
    res: Response): Promise<void> {
    const existComment = await this.commentService.findById(body.id);

    if (existComment) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Comment with id «${body.id}» exists.`,
        'CommentController'
      );
    }

    const result = await this.commentService.create(body);
    this.created(res, fillDTO(CommentDto, result));
  }

  public async findById(commentId: string, res: Response): Promise<void> {
    const comment = await this.commentService.findById(commentId);

    if (!comment) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${commentId}» not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(CommentDto, comment));

  }

  public async index(_req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findAll();
    const responseData = fillDTO(CommentDto, comments);
    this.ok(res, responseData);
  }
}
