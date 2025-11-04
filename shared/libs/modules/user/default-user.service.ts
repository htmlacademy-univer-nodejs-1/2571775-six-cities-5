import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../../types/component.js';
import { Logger } from '../../logger/index.js';
import { CreateUserDto, UserEntity, UserService } from './index.js';
import { OfferEntity } from '../offer/index.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);
    const result = await this.userModel.create(user);
    this.logger.info(`User with email ${dto.email} was created`);
    return result;
  }

  public async findByEmail(
    email: string
  ): Promise<DocumentType<UserEntity> | null> {
    return await this.userModel.findOne({ email });
  }

  public async findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    let user = await this.findByEmail(dto.email);
    if (!user) {
      user = await this.create(dto, salt);
    }
    return user;
  }

  public async addFavorite(userId: string, offerId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    if (!user.favorites.includes(offerId)) {
      user.favorites.push(offerId);
      await user.save();
      this.logger.info(`Offer with ID ${offerId} added to favorites for user ${userId}`);
    }
  }

  public async removeFavorite(userId: string, offerId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    user.favorites = user.favorites.filter((id) => id !== offerId);
    await user.save();
    this.logger.info(`Offer with ID ${offerId} removed from favorites for user ${userId}`);
  }

  public async getFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return this.offerModel.find({ _id: { $in: user.favorites } }).exec();
  }

}
