import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { City, Convenience, Coordinate } from '../../../../src/models/index.js';
import { HousingType } from '../../../enums/index.js';
import { UserEntity } from '../user/index.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'offers' } })
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public name!: string;

  @prop({ required: true })
  public offerDescription!: string;

  @prop({ required: true })
  public publicationDate!: Date;

  @prop({ required: true, _id: false })
  public city!: City;

  @prop({ required: true })
  public previewUrl!: string;

  @prop({ type: () => [String], required: true, default: [] })
  public housingImages!: string[];

  @prop({ default: false })
  public isPremium!: boolean;

  @prop({ default: false })
  public isFavorite!: boolean;

  @prop({ default: 0 })
  public rating!: number;

  @prop({ required: true, enum: HousingType })
  public housingType!: HousingType;

  @prop({ required: true })
  public roomsCount!: number;

  @prop({ required: true })
  public guestsCount!: number;

  @prop({ required: true })
  public rentalCost!: number;

  @prop({ type: () => [String], _id: false, required: true, default: [] })
  public convenienceList!: Convenience[];

  @prop({ ref: () => UserEntity, required: true })
  public author!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentsCount!: number;

  @prop({ default: 0 })
  public averageRating!: number;

  @prop({ required: true, _id: false })
  public offerCoordinates!: Coordinate;
}

export const OfferModel = getModelForClass(OfferEntity);
