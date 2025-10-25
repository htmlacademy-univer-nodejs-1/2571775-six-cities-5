import { City, HousingType } from '../../models/index.js';

export type GetRentalOfferDto = {
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
