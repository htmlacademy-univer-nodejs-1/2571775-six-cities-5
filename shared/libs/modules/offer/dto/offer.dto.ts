import { IsDateString, MaxLength, MinLength, IsEnum, IsUrl, IsArray, IsBoolean, IsInt, Min, Max, ArrayMinSize, ArrayMaxSize, IsNumber, IsObject, ValidateNested, IsMongoId } from 'class-validator';
import {
  City,
  Convenience,
  Coordinate,
} from '../../../../../src/models/index.js';
import { HousingType } from '../../../../enums/index.js';
import { OfferValidationMessage } from '../dto/offer-messages.js';

export class OfferDto {
  public id!: string;

  @MinLength(10, { message: OfferValidationMessage.name.minLength })
  @MaxLength(100, { message: OfferValidationMessage.name.maxLength })
  public name!: string;

  @MaxLength(20, { message: OfferValidationMessage.offerDescription.minLength})
  @MaxLength(20, { message: OfferValidationMessage.offerDescription.maxLength})
  public offerDescription!: string;

  @IsDateString({}, {message: OfferValidationMessage.publicationDate.invalidFormat})
  public publicationDate!: Date;

  @IsEnum(City, { message: OfferValidationMessage.city.invalidId })
  public city!: City;

  @IsUrl({}, {message: OfferValidationMessage.previewUrl.invalidUrl})
  public previewUrl!: string;

  @IsArray({ message: OfferValidationMessage.housingImages.invalidFormat})
  @IsUrl({}, {message: OfferValidationMessage.housingImages.invalidId})
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  public housingImages!: string[];

  @IsBoolean({message: OfferValidationMessage.isPremium.invalidId})
  public isPremium!: boolean;

  @IsBoolean({message: OfferValidationMessage.isFavorite.invalidId})
  public isFavorite!: boolean;

  @IsNumber({}, {message: OfferValidationMessage.rating.invalidFormat})
  @Min(0, {message: OfferValidationMessage.rating.minValue})
  @Max(5, {message: OfferValidationMessage.rating.maxValue})
  public rating!: number;

  @IsEnum(HousingType, {message: OfferValidationMessage.housingType.invalidId})
  public housingType!: HousingType;

  @IsInt({message: OfferValidationMessage.roomsCount.invalidFormat})
  @Min(1, {message: OfferValidationMessage.roomsCount.minValue})
  @Max(8, {message: OfferValidationMessage.roomsCount.maxValue})
  public roomsCount!: number;

  @IsInt({message: OfferValidationMessage.guestsCount.invalidFormat})
  @Min(1, {message: OfferValidationMessage.guestsCount.minValue})
  @Max(10, {message: OfferValidationMessage.guestsCount.maxValue})
  public guestsCount!: number;

  @IsNumber({}, {message: OfferValidationMessage.guestsCount.invalidFormat})
  @Min(100, {message: OfferValidationMessage.guestsCount.minValue})
  @Max(100_000, {message: OfferValidationMessage.guestsCount.maxValue})
  public rentalCost!: number;

  @IsArray({ message: OfferValidationMessage.housingImages.invalidFormat})
  @IsUrl({}, {message: OfferValidationMessage.housingImages.invalidId})
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  public convenienceList!: Convenience[];

  @IsMongoId({message: OfferValidationMessage.author.invalidId})
  public author!: string;

  @IsInt({message: OfferValidationMessage.guestsCount.invalidFormat})
  @Min(0, {message: OfferValidationMessage.guestsCount.minValue})
  public commentsCount!: number;

  @IsNumber({}, {message: OfferValidationMessage.rating.invalidFormat})
  @Min(0, {message: OfferValidationMessage.rating.minValue})
  @Max(5, {message: OfferValidationMessage.rating.maxValue})
  public averageRating!: number;

  @IsObject()
  @ValidateNested()
  public offerCoordinates!: Coordinate;

  public userId!: string;
}
