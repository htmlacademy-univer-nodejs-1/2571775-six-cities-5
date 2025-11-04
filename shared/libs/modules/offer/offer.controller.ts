import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpError, ValidateObjectIdMiddleware } from '../../rest/index.js';
import { Logger } from '../../logger/logger.interface.js';
import { Component, HttpMethod } from '../../../types/index.js';
import { CreateOfferDto, OfferService, CreateOfferRdo,
  CreateOfferRequest, EditOfferRequest,
  EditOfferDto, DeleteOfferDto,
  GetAllOfferRequest,
  GetAllOfferDto} from './index.js';
import { fillDTO } from '../../helpers/index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
      @inject(Component.Logger) protected readonly logger: Logger,
      @inject(Component.OfferService) private readonly offerService: OfferService,
  ){
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]});
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response): Promise<void> {
    const existOffer = await this.offerService.findById(body.id);

    if (existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Category with name «${body.name}» exists.`,
        'CategoryController'
      );
    }

    const result = await this.offerService.create(body);
    this.created(res, fillDTO(CreateOfferDto, result));
  }

  public async edit(
    { body }: EditOfferRequest,
    res: Response): Promise<void> {
    const existOffer = await this.offerService.findById(body.id);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Category with name «${body.name}» does not exists.`,
        'CategoryController'
      );
    }

    const result = await this.offerService.edit(body.id, body);
    this.ok(res, fillDTO(EditOfferDto, result));
  }

  public async delete(
    offerId: string,
    res: Response): Promise<void> {
    const existOffer = await this.offerService.findById(offerId);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Category with id «${offerId}» does not exists.`,
        'CategoryController'
      );
    }

    const result = await this.offerService.delete(offerId);
    this.ok(res, fillDTO(DeleteOfferDto, result));
  }

  public async getAll({ body } : GetAllOfferRequest,
    res: Response): Promise<void> {
    const result = await this.offerService.findAll(body.city, body.limit, body.sortBy);
    this.ok(res, fillDTO(GetAllOfferDto, result));
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findAll();
    const responseData = fillDTO(CreateOfferRdo, offers);
    this.ok(res, responseData);
  }
}
