import { inject, injectable } from 'inversify';
import { OfferService, CreateOfferDto, OfferEntity, EditOfferDto } from './index.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);
    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id).exec();
  }

  public async findAll(city?: string, limit = 60, sortBy: 'date' | 'price' = 'date'): Promise<DocumentType<OfferEntity>[]> {
    const filter = city ? { city } : {};
    return this.offerModel.find(filter).sort({ [sortBy]: 1 }).limit(limit).exec();
  }

  public async findPremium(city: string, limit = 3): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city, isPremium: true })
      .sort({ date: -1 })
      .limit(limit)
      .exec();
  }

  public async edit(offerId: string, dto: EditOfferDto): Promise<DocumentType<OfferEntity>> {
    const offer = await this.offerModel.findByIdAndUpdate(offerId, dto, { new: true }).exec();
    if (!offer) {
      throw new Error('Offer not found');
    }

    this.logger.info(`Offer ${offerId} updated.`);
    return offer;
  }

  public async delete(offerId: string): Promise<DocumentType<OfferEntity>> {
    const offer = await this.offerModel.findByIdAndDelete(offerId).exec();
    if (!offer) {
      throw new Error('Offer not found');
    }

    this.logger.info(`Offer ${offerId} deleted.`);
    return offer;
  }
}
