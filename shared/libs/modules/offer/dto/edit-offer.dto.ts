import { City, Convenience, Coordinate } from '../../../../../src/models/index.js';
import { HousingType } from '../../../../enums/index.js';

export class EditOfferDto {
  public id!: string;
  public name!: string;
  public offerDescription!: string;
  public publicationDate!: Date;
  public city!: City;
  public previewUrl!: string;
  public housingImages!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public housingType!: HousingType;
  public roomsCount!: number;
  public guestsCount!: number;
  public rentalCost!: number;
  public convenienceList!: Convenience[];
  public author!: string;
  public commentsCount!: number;
  public averageRating!: number;
  public offerCoordinates!: Coordinate;
}
