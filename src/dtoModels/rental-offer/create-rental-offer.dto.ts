import { City, Convenience, Coordinate, HousingType } from '../../models/index.js';

export type CreateRentalOfferDto = {
  name: string;
  offerDescription: string;
  publicationDate: Date;
  city: City;
  previewUrl: string;
  housingImages: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomsCount: number;
  guestsCount: number;
  rentalCost: number;
  convenienceList: Convenience[];
  author: string;
  commentsCount: number;
  offerCoordinates: Coordinate;
};
