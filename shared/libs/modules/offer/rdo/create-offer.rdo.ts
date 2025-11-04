import { Expose, Type } from 'class-transformer';
import { City, Convenience, Coordinate, HousingType } from '../../../../../src/models/index.js';
import { CreateUserDto } from '../../user/index.js';

export class CreateOfferRdo {
  @Expose()
  public name!: string;

  @Expose()
  public offerDescription!: string;

  @Expose()
  public publicationDate!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public previewUrl!: string;

  @Expose()
  public housingImages!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public housingType!: HousingType;

  @Expose()
  public roomsCount!: number;

  @Expose()
  public guestsCount!: number;

  @Expose()
  public rentalCost!: number;

  @Expose()
  public convenienceList!: Convenience[];

  @Expose()
  @Type(() => CreateUserDto)
  public author!: CreateUserDto;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public averageRating!: number;

  @Expose()
  public offerCoordinates!: Coordinate;
}
