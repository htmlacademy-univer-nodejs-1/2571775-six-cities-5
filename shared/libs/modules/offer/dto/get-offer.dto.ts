import { City, HousingType } from '../../../../../src/models/index.js';

export type GetOfferDto = {
  name: string;
  publicationDate: Date;
  city: City;
  previewUrl: string;
  housingImages: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  rentalCost: number;
  commentsCount: number;
};
